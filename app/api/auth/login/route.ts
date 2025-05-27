import { type NextRequest, NextResponse } from "next/server"
import { findUserByEmail, verifyPassword, generateToken, updateUserLastLogin } from "../lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const user = await findUserByEmail(email)
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    if (!user.isActive) {
      return NextResponse.json({ error: "Account is deactivated" }, { status: 401 })
    }

    const isValidPassword = await verifyPassword(password, user.password!)
    if (!isValidPassword) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    await updateUserLastLogin(user._id!)

    const token = generateToken({
      userId: user._id!,
      email: user.email,
      role: user.role,
      permissions: user.permissions,
    })

    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      token,
      user: userWithoutPassword,
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
