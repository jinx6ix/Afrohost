"use client"

import type React from "react"

import { useAuth } from "@/contexts/AuthContext"
import { canAccessRoute } from "@/lib/auth"
import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: string
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push("/login")
        return
      }

      if (user && !canAccessRoute(user.role, pathname)) {
        router.push("/unauthorized")
        return
      }

      if (requiredRole && user?.role !== requiredRole) {
        router.push("/unauthorized")
        return
      }
    }
  }, [isAuthenticated, isLoading, user, pathname, router, requiredRole])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (!isAuthenticated || (requiredRole && user?.role !== requiredRole)) {
    return null
  }

  return <>{children}</>
}
