import { type NextRequest, NextResponse } from "next/server"
import { verifyToken, hasPermission } from "./auth"

export function withAuth(handler: Function, requiredPermission?: string) {
  return async (request: NextRequest, context?: any) => {
    try {
      const token = request.headers.get("authorization")?.replace("Bearer ", "")

      if (!token) {
        return NextResponse.json({ error: "No token provided" }, { status: 401 })
      }

      const payload = verifyToken(token)
      if (!payload) {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 })
      }

      if (requiredPermission && !hasPermission(payload.role, requiredPermission)) {
        return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 })
      }

      // Add user info to request
      const requestWithUser = request as NextRequest & { user: typeof payload }
      requestWithUser.user = payload

      return handler(requestWithUser, context)
    } catch (error) {
      return NextResponse.json({ error: "Authentication failed" }, { status: 401 })
    }
  }
}
