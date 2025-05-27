import { Router } from "express"
import { connectToDatabase } from "../config/database"
import { authenticate, authorize, type AuthRequest } from "../middleware/auth"
import { validate, schemas } from "../middleware/validation"
import { createError } from "../middleware/errorHandler"
import { hashPassword, ROLE_PERMISSIONS } from "../config/auth"
import { ObjectId } from "mongodb"

const router = Router()

// Get users with pagination and filtering
router.get("/", authenticate, authorize("manage_users"), async (req: AuthRequest, res, next) => {
  try {
    const page = Number.parseInt(req.query.page as string) || 1
    const limit = Number.parseInt(req.query.limit as string) || 10
    const search = (req.query.search as string) || ""
    const role = (req.query.role as string) || ""
    const department = (req.query.department as string) || ""

    const db = await connectToDatabase()
    const users = db.collection("users")

    const filter: any = {}
    if (search) {
      filter.$or = [{ name: { $regex: search, $options: "i" } }, { email: { $regex: search, $options: "i" } }]
    }
    if (role && role !== "all") filter.role = role
    if (department && department !== "all") filter.department = department

    const skip = (page - 1) * limit
    const totalUsers = await users.countDocuments(filter)
    const userList = await users
      .find(filter, { projection: { password: 0 } })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .toArray()

    res.json({
      users: userList.map((user) => ({ ...user, _id: user._id.toString() })),
      pagination: {
        page,
        limit,
        total: totalUsers,
        pages: Math.ceil(totalUsers / limit),
      },
    })
  } catch (error) {
    next(error)
  }
})

// Create user
router.post(
  "/",
  authenticate,
  authorize("manage_users"),
  validate(schemas.createUser),
  async (req: AuthRequest, res, next) => {
    try {
      const { email, password, name, role = "user", department = "General" } = req.body

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
  },
)

// Update user
router.put(
  "/:id",
  authenticate,
  authorize("manage_users"),
  validate(schemas.updateUser),
  async (req: AuthRequest, res, next) => {
    try {
      const { id } = req.params
      const updates = req.body

      if (!ObjectId.isValid(id)) {
        throw createError("Invalid user ID", 400)
      }

      const db = await connectToDatabase()
      const users = db.collection("users")

      // Hash password if provided
      if (updates.password) {
        updates.password = await hashPassword(updates.password)
      }

      // Update permissions based on role
      if (updates.role) {
        updates.permissions = ROLE_PERMISSIONS[updates.role as keyof typeof ROLE_PERMISSIONS] || ROLE_PERMISSIONS.user
      }

      const result = await users.updateOne({ _id: new ObjectId(id) }, { $set: { ...updates, updatedAt: new Date() } })

      if (result.matchedCount === 0) {
        throw createError("User not found", 404)
      }

      const updatedUser = await users.findOne({ _id: new ObjectId(id) }, { projection: { password: 0 } })

      res.json({
        message: "User updated successfully",
        user: { ...updatedUser, _id: updatedUser!._id.toString() },
      })
    } catch (error) {
      next(error)
    }
  },
)

// Delete user
router.delete("/:id", authenticate, authorize("manage_users"), async (req: AuthRequest, res, next) => {
  try {
    const { id } = req.params

    if (!ObjectId.isValid(id)) {
      throw createError("Invalid user ID", 400)
    }

    const db = await connectToDatabase()
    const users = db.collection("users")

    const result = await users.deleteOne({ _id: new ObjectId(id) })

    if (result.deletedCount === 0) {
      throw createError("User not found", 404)
    }

    res.json({ message: "User deleted successfully" })
  } catch (error) {
    next(error)
  }
})

// Get user by ID
router.get("/:id", authenticate, authorize("manage_users"), async (req: AuthRequest, res, next) => {
  try {
    const { id } = req.params

    if (!ObjectId.isValid(id)) {
      throw createError("Invalid user ID", 400)
    }

    const db = await connectToDatabase()
    const users = db.collection("users")

    const user = await users.findOne({ _id: new ObjectId(id) }, { projection: { password: 0 } })

    if (!user) {
      throw createError("User not found", 404)
    }

    res.json({
      user: { ...user, _id: user._id.toString() },
    })
  } catch (error) {
    next(error)
  }
})

export default router
