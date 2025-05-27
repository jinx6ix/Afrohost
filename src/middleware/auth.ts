import type { Request, Response, NextFunction } from "express"
import { verifyToken, hasPermission, hasWorklineAccess } from "../config/auth"

export interface AuthRequest extends Request {
  user?: {
    userId: string
    email: string
    role: string
    permissions: string[]
    worklines: string[]
    primaryWorkline?: string
  }
}

export function authenticate(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "")

    if (!token) {
      return res.status(401).json({ error: "No token provided" })
    }

    const payload = verifyToken(token)
    if (!payload) {
      return res.status(401).json({ error: "Invalid token" })
    }

    req.user = payload
    next()
  } catch (error) {
    return res.status(401).json({ error: "Authentication failed" })
  }
}

export function authorize(requiredPermission: string) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: "Authentication required" })
    }

    if (!hasPermission(req.user.role, requiredPermission)) {
      return res.status(403).json({ error: "Insufficient permissions" })
    }

    next()
  }
}

export function requireWorkline(workline: "cybersecurity" | "hosting") {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: "Authentication required" })
    }

    if (!hasWorklineAccess(req.user.worklines, workline)) {
      return res.status(403).json({ error: `Access denied to ${workline} workline` })
    }

    next()
  }
}
