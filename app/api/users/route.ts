import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "../components/lib/mongodb"
import { withAuth, ROLE_PERMISSIONS } from "../components/lib/auth"
import { hashPassword } from "../components/lib/auth" // Import hashPassword directly
import { ObjectId } from "mongodb"

async function getUsers(request: NextRequest & { user: any }) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const search = searchParams.get("search") || ""
    const role = searchParams.get("role") || ""
    const department = searchParams.get("department") || ""

    const db = await getDatabase()
    const users = db.collection("users")

    const filter: any = {}
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } }
      ]
    }
    if (role) filter.role = role
    if (department) filter.department = department

    const skip = (page - 1) * limit
    const totalUsers = await users.countDocuments(filter)
    const userList = await users
      .find(filter, { projection: { password: 0 } })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .toArray()

    return NextResponse.json({
      users: userList.map((user) => ({
        ...user,
        _id: user._id.toString(),
        createdAt: user.createdAt.toISOString(),
        lastLogin: user.lastLogin?.toISOString()
      })),
      pagination: {
        page,
        limit,
        total: totalUsers,
        pages: Math.ceil(totalUsers / limit)
      }
    })
  } catch (error) {
    console.error("Get users error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

async function createUser(request: NextRequest & { user: any }) {
  try {
    const userData = await request.json()
    const { email, password, name, role = "user", department = "General" } = userData

    // Validation
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Email, password, and name are required" },
        { status: 400 }
      )
    }

    if (!email.includes("@")) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      )
    }

    const db = await getDatabase()
    const users = db.collection("users")

    // Check for existing user
    const existingUser = await users.findOne({ email })
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      )
    }

    // Set permissions based on role
    const permissions = ROLE_PERMISSIONS[role as keyof typeof ROLE_PERMISSIONS] || ROLE_PERMISSIONS.user

    // Create new user
    const newUser = {
      email,
      password: await hashPassword(password),
      name,
      role,
      permissions,
      department,
      isActive: true,
      createdAt: new Date(),
      lastLogin: null
    }

    const result = await users.insertOne(newUser)
    
    // Remove password before returning
    const { password: _, ...userWithoutPassword } = newUser

    return NextResponse.json(
      {
        message: "User created successfully",
        user: {
          ...userWithoutPassword,
          _id: result.insertedId.toString(),
          createdAt: newUser.createdAt.toISOString()
        }
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Create user error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// Corrected withAuth usage with options object
export const GET = withAuth(getUsers, { 
  requiredPermission: "manage_users",
  requiredRole: "admin" // Optional: require admin role
})

export const POST = withAuth(createUser, {
  requiredPermission: "manage_users",
  requiredRole: "admin" // Optional: require admin role
})