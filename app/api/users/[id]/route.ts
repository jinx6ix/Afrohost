import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "../lib/mongodb"
import { withAuth, hashPassword, ROLE_PERMISSIONS } from "../lib/auth"
import { ObjectId } from "mongodb"

async function updateUser(request: NextRequest & { user: any }, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const updates = await request.json()

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 })
    }

    // Prevent updating certain fields
    if (updates._id || updates.createdAt) {
      return NextResponse.json({ error: "Cannot update protected fields" }, { status: 400 })
    }

    const db = await getDatabase()
    const users = db.collection("users")

    // Verify user exists
    const existingUser = await users.findOne({ _id: new ObjectId(id) })
    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // If password is being updated, hash it
    if (updates.password) {
      if (updates.password.length < 8) {
        return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 })
      }
      updates.password = await hashPassword(updates.password)
    }

    // Update permissions based on role
    if (updates.role) {
      updates.permissions = ROLE_PERMISSIONS[updates.role as keyof typeof ROLE_PERMISSIONS] || ROLE_PERMISSIONS.user
    }

    const result = await users.updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...updates, updatedAt: new Date() } }
    )

    const updatedUser = await users.findOne(
      { _id: new ObjectId(id) },
      { projection: { password: 0 } }
    )

    return NextResponse.json({
      message: "User updated successfully",
      user: { 
        ...updatedUser,
        _id: updatedUser!._id.toString(),
        createdAt: updatedUser!.createdAt.toISOString(),
        updatedAt: updatedUser!.updatedAt.toISOString(),
        lastLogin: updatedUser!.lastLogin?.toISOString()
      }
    })
  } catch (error) {
    console.error("Update user error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

async function deleteUser(request: NextRequest & { user: any }, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 })
    }

    const db = await getDatabase()
    const users = db.collection("users")

    // Soft delete instead of hard delete
    const result = await users.updateOne(
      { _id: new ObjectId(id) },
      { $set: { isActive: false, updatedAt: new Date() } }
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "User deactivated successfully" })
  } catch (error) {
    console.error("Delete user error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Corrected withAuth usage with options object
export const PUT = withAuth(updateUser, { 
  requiredPermission: "manage_users",
  requiredRole: "admin" // Optional: require admin role
})

export const DELETE = withAuth(deleteUser, {
  requiredPermission: "manage_users",
  requiredRole: "admin" // Optional: require admin role
})