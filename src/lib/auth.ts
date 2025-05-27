import type { User } from "./api"

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
}

export const getAuthState = (): AuthState => {
  if (typeof window === "undefined") {
    return {
      user: null,
      token: null,
      isAuthenticated: false,
    }
  }

  const token = localStorage.getItem("token")
  const userStr = localStorage.getItem("user")
  const user = userStr ? JSON.parse(userStr) : null

  return {
    user,
    token,
    isAuthenticated: !!(token && user),
  }
}

export const setAuthState = (user: User, token: string) => {
  localStorage.setItem("token", token)
  localStorage.setItem("user", JSON.stringify(user))
}

export const clearAuthState = () => {
  localStorage.removeItem("token")
  localStorage.removeItem("user")
}

export const hasPermission = (userRole: string, requiredPermission: string): boolean => {
  const rolePermissions = {
    admin: ["read", "write", "delete", "manage_users", "manage_pages", "manage_tasks", "view_analytics"],
    moderator: ["read", "write", "manage_tasks", "manage_pages", "view_analytics"],
    user: ["read", "view_analytics"],
  }

  const permissions = rolePermissions[userRole as keyof typeof rolePermissions] || []
  return permissions.includes(requiredPermission)
}

export const canAccessRoute = (userRole: string, route: string): boolean => {
  const routePermissions = {
    "/admin": "read",
    "/admin/users": "manage_users",
    "/admin/tasks": "manage_tasks",
    "/admin/pages": "manage_pages",
    "/admin/analytics": "view_analytics",
  }

  const requiredPermission = routePermissions[route as keyof typeof routePermissions]
  return requiredPermission ? hasPermission(userRole, requiredPermission) : true
}
