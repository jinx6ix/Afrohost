import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { getDatabase } from "./mongodb"

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
  const users = db.collection("users")

  const hashedPassword = await hashPassword(userData.password!)
  const user = {
    ...userData,
    password: hashedPassword,
    createdAt: new Date(),
  }

  const result = await users.insertOne(user)
  return { ...user, _id: result.insertedId.toString() }
}

export async function findUserByEmail(email: string): Promise<User | null> {
  const db = await getDatabase()
  const users = db.collection("users")
  const user = await users.findOne({ email })

  if (user) {
    return { ...user, _id: user._id.toString() }
  }
  return null
}

export async function updateUserLastLogin(userId: string): Promise<void> {
  const db = await getDatabase()
  const users = db.collection("users")
  await users.updateOne({ _id: userId }, { $set: { lastLogin: new Date() } })
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
