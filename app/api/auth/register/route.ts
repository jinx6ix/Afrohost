import { type NextRequest, NextResponse } from "next/server"
import { createUser, findUserByEmail, ROLE_PERMISSIONS } from "../lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, role = "user", department = "General" } = await request.json()

    if (!email || !password || !name) {
      return NextResponse.json({ error: "Email, password, and name are required" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 })
    }

    const existingUser = await findUserByEmail(email)
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 })
    }

    const permissions = ROLE_PERMISSIONS[role as keyof typeof ROLE_PERMISSIONS] || ROLE_PERMISSIONS.user

    const user = await createUser({
      email,
      password,
      name,
      role: role as "admin" | "moderator" | "user",
      permissions,
      department,
      isActive: true,
    })

    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json(
      {
        message: "User created successfully",
        user: userWithoutPassword,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
