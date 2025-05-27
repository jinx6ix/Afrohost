"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { type User, authAPI } from "@/lib/api"
import { getAuthState, setAuthState, clearAuthState } from "@/lib/auth"

interface AuthContextType {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  updateUser: (user: User) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      const authState = getAuthState()

      if (authState.token) {
        try {
          // Verify token with backend
          const response = await authAPI.verify()
          setUser(response.user)
          setToken(authState.token)
        } catch (error) {
          // Token is invalid, clear auth state
          clearAuthState()
        }
      }

      setIsLoading(false)
    }

    initAuth()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response = await authAPI.login(email, password)
      const { user, token } = response

      setUser(user)
      setToken(token)
      setAuthState(user, token)
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    clearAuthState()
  }

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser)
    if (token) {
      setAuthState(updatedUser, token)
    }
  }

  const value = {
    user,
    token,
    isAuthenticated: !!(user && token),
    isLoading,
    login,
    logout,
    updateUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
