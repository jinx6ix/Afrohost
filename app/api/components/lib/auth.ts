import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { getDatabase } from "./mongodb"
import { NextRequest, NextResponse } from 'next/server'

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-key"

export interface User {
  _id?: string
  email: string
  password?: string
  name: string
  role: "admin" | "moderator" | "user"
  permissions: string[]
  department: string
  isActive: boolean
  createdAt: Date
  lastLogin?: Date
}

export interface JWTPayload {
  userId: string
  email: string
  role: string
  permissions: string[]
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" })
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload
  } catch {
    return null
  }
}

export async function createUser(userData: Omit<User, "_id" | "createdAt">): Promise<User> {
  const db = await getDatabase()
  const users = db.collection<User>("users")

  const hashedPassword = await hashPassword(userData.password!)
  const newUser = {
    ...userData,
    password: hashedPassword,
    createdAt: new Date(),
    isActive: true, // Ensure default value
    permissions: userData.permissions || [] // Ensure array exists
  }

  const result = await users.insertOne(newUser)
  return {
    ...newUser,
    _id: result.insertedId.toString()
  }
}

export async function findUserByEmail(email: string): Promise<User | null> {
  const db = await getDatabase()
  const users = db.collection<User>("users") // Explicit collection type
  const user = await users.findOne({ email })

  if (!user) return null

  return {
    ...user,
    _id: user._id.toString(), // Convert ObjectId to string
    createdAt: user.createdAt, // Ensure Date is preserved
    lastLogin: user.lastLogin // Optional field
  }
}

import { ObjectId } from 'mongodb'; // Add this import at the top

export async function updateUserLastLogin(userId: string): Promise<void> {
  const db = await getDatabase()
  const users = db.collection("users")
  await users.updateOne(
    { _id: new ObjectId(userId) }, // Convert string to ObjectId
    { $set: { lastLogin: new Date() } }
  )
}
export const ROLE_PERMISSIONS = {
  admin: ["read", "write", "delete", "manage_users", "manage_pages", "manage_tasks", "view_analytics"],
  moderator: ["read", "write", "manage_tasks", "manage_pages", "view_analytics"],
  user: ["read", "view_analytics"],
}

export function hasPermission(userRole: string, requiredPermission: string): boolean {
  const permissions = ROLE_PERMISSIONS[userRole as keyof typeof ROLE_PERMISSIONS] || []
  return permissions.includes(requiredPermission)
}

type Handler = (req: NextRequest, params: any, user: JWTPayload) => Promise<NextResponse>

// Add this type to your auth.ts
export type AuthenticatedRequest = NextRequest & {
  user: JWTPayload
}

export function withAuth(
  handler: (req: NextRequest & { user: any }, params: any) => Promise<NextResponse>,
  options?: {
    requiredPermission?: string;
    requiredRole?: string;
  }
) {
  return async (req: NextRequest, params: any) => {
    try {
      // 1. Get token
      const token = req.headers.get('authorization')?.split(' ')[1] || req.cookies.get('token')?.value
      
      if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }

      // 2. Verify token
      const user = verifyToken(token)
      if (!user) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
      }

      // 3. Check role if required
      if (options?.requiredRole && user.role !== options.requiredRole) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
      }

      // 4. Check permission if required
      if (options?.requiredPermission && !hasPermission(user.role, options.requiredPermission)) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
      }

      // 5. Create authenticated request
      const authenticatedRequest = Object.assign(req, { user }) as AuthenticatedRequest
      
      // 6. Call handler
      return handler(authenticatedRequest, params)
    } catch (error) {
      console.error('Authentication error:', error)
      return NextResponse.json({ error: 'Authentication failed' }, { status: 500 })
    }
  }
}
