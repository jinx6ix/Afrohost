import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-key"
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "24h"

export interface User {
  _id?: string
  email: string
  password?: string
  name: string
  role: "admin" | "moderator" | "user"
  permissions: string[]
  department: string
  worklines: ("cybersecurity" | "hosting")[]
  primaryWorkline?: "cybersecurity" | "hosting"
  isActive: boolean
  createdAt: Date
  lastLogin?: Date
}

export interface JWTPayload {
  userId: string
  email: string
  role: string
  permissions: string[]
  worklines: string[]
  primaryWorkline?: string
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload
  } catch {
    return null
  }
}

export const ROLE_PERMISSIONS = {
  admin: [
    "read",
    "write",
    "delete",
    "manage_users",
    "manage_pages",
    "manage_tasks",
    "view_analytics",
    "manage_clients",
    "manage_incidents",
    "manage_threats",
    "manage_servers",
    "manage_domains",
    "access_cybersecurity",
    "access_hosting",
  ],
  moderator: [
    "read",
    "write",
    "manage_tasks",
    "manage_pages",
    "view_analytics",
    "manage_clients",
    "manage_incidents",
    "manage_servers",
  ],
  user: ["read", "view_analytics"],
}

export const WORKLINE_PERMISSIONS = {
  cybersecurity: [
    "access_cybersecurity",
    "manage_cyber_tasks",
    "manage_cyber_pages",
    "manage_cyber_clients",
    "manage_incidents",
    "manage_threats",
  ],
  hosting: [
    "access_hosting",
    "manage_hosting_tasks",
    "manage_hosting_pages",
    "manage_hosting_clients",
    "manage_servers",
    "manage_domains",
  ],
}

export function hasPermission(userRole: string, requiredPermission: string): boolean {
  const permissions = ROLE_PERMISSIONS[userRole as keyof typeof ROLE_PERMISSIONS] || []
  return permissions.includes(requiredPermission)
}

export function hasWorklineAccess(userWorklines: string[], requiredWorkline: string): boolean {
  return userWorklines.includes(requiredWorkline)
}
