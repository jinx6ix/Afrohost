import { Router } from "express"
import { connectToDatabase } from "../config/database"
import { hashPassword, verifyPassword, generateToken, ROLE_PERMISSIONS } from "../config/auth"
import { validate, schemas } from "../middleware/validation"
import { createError } from "../middleware/errorHandler"
import { ObjectId } from "mongodb"

const router = Router()

// Register
router.post("/register", validate(schemas.register), async (req, res, next) => {
  try {
    const {
      email,
      password,
      name,
      role = "user",
      department = "General",
      worklines = ["cybersecurity"],
      primaryWorkline = "cybersecurity",
    } = req.body

    const db = await connectToDatabase()
    const users = db.collection("users")

    const existingUser = await users.findOne({ email })
    if (existingUser) {
      throw createError("User already exists", 409)
    }

    const hashedPassword = await hashPassword(password)
    const permissions = ROLE_PERMISSIONS[role as keyof typeof ROLE_PERMISSIONS] || ROLE_PERMISSIONS.user

    const newUser = {
      email,
      password: hashedPassword,
      name,
      role,
      permissions,
      department,
      worklines,
      primaryWorkline,
      isActive: true,
      createdAt: new Date(),
    }

    const result = await users.insertOne(newUser)
    const { password: _, ...userWithoutPassword } = newUser

    res.status(201).json({
      message: "User created successfully",
      user: { ...userWithoutPassword, _id: result.insertedId.toString() },
    })
  } catch (error) {
    next(error)
  }
})

// Login
router.post("/login", validate(schemas.login), async (req, res, next) => {
  try {
    const { email, password } = req.body

    const db = await connectToDatabase()
    const users = db.collection("users")

    const user = await users.findOne({ email })
    if (!user) {
      throw createError("Invalid credentials", 401)
    }

    if (!user.isActive) {
      throw createError("Account is deactivated", 401)
    }

    const isValidPassword = await verifyPassword(password, user.password)
    if (!isValidPassword) {
      throw createError("Invalid credentials", 401)
    }

    // Update last login
    await users.updateOne({ _id: user._id }, { $set: { lastLogin: new Date() } })

    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
      permissions: user.permissions,
      worklines: user.worklines || ["cybersecurity"],
      primaryWorkline: user.primaryWorkline || "cybersecurity",
    })

    const { password: _, ...userWithoutPassword } = user

    res.json({
      token,
      user: { ...userWithoutPassword, _id: user._id.toString() },
      availableWorklines: user.worklines || ["cybersecurity"],
      primaryWorkline: user.primaryWorkline || "cybersecurity",
    })
  } catch (error) {
    next(error)
  }
})

// Switch workline
router.post("/switch-workline", async (req, res, next) => {
  try {
    const { workline } = req.body
    const token = req.headers.authorization?.replace("Bearer ", "")

    if (!token) {
      throw createError("No token provided", 401)
    }

    const { verifyToken } = await import("../config/auth")
    const payload = verifyToken(token)

    if (!payload) {
      throw createError("Invalid token", 401)
    }

    const db = await connectToDatabase()
    const users = db.collection("users")
    const user = await users.findOne({ _id: new ObjectId(payload.userId) })

    if (!user || !user.isActive) {
      throw createError("User not found or inactive", 401)
    }

    if (!user.worklines?.includes(workline)) {
      throw createError("Access denied to this workline", 403)
    }

    // Update user's primary workline
    await users.updateOne({ _id: new ObjectId(payload.userId) }, { $set: { primaryWorkline: workline } })

    // Generate new token with updated workline
    const newToken = generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
      permissions: user.permissions,
      worklines: user.worklines,
      primaryWorkline: workline,
    })

    res.json({
      token: newToken,
      workline,
      message: `Switched to ${workline} workline`,
    })
  } catch (error) {
    next(error)
  }
})

// Verify token
router.get("/verify", async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "")

    if (!token) {
      throw createError("No token provided", 401)
    }

    const { verifyToken } = await import("../config/auth")
    const payload = verifyToken(token)

    if (!payload) {
      throw createError("Invalid token", 401)
    }

    const db = await connectToDatabase()
    const users = db.collection("users")
    const user = await users.findOne({ _id: new ObjectId(payload.userId) }, { projection: { password: 0 } })

    if (!user || !user.isActive) {
      throw createError("User not found or inactive", 401)
    }

    res.json({
      user: { ...user, _id: user._id.toString() },
      worklines: user.worklines || ["cybersecurity"],
      primaryWorkline: user.primaryWorkline || "cybersecurity",
    })
  } catch (error) {
    next(error)
  }
})

export default router
