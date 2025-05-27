"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import { AdminSidebar } from "@/components/AdminSidebar"
import { AdminHeader } from "@/components/AdminHeader"
import { WorklineSelector } from "@/components/WorklineSelector"
import { useAuth } from "@/contexts/AuthContext"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user } = useAuth()
  const [selectedWorkline, setSelectedWorkline] = useState<"cybersecurity" | "hosting" | null>(null)
  const [showWorklineSelector, setShowWorklineSelector] = useState(false)

  useEffect(() => {
    // Check if user has already selected a workline
    const savedWorkline = localStorage.getItem("workline") as "cybersecurity" | "hosting" | null

    if (savedWorkline && user?.worklines?.includes(savedWorkline)) {
      setSelectedWorkline(savedWorkline)
    } else if (user?.primaryWorkline) {
      setSelectedWorkline(user.primaryWorkline)
      localStorage.setItem("workline", user.primaryWorkline)
    } else {
      setShowWorklineSelector(true)
    }
  }, [user])

  const handleWorklineSelected = (workline: "cybersecurity" | "hosting") => {
    setSelectedWorkline(workline)
    setShowWorklineSelector(false)
    localStorage.setItem("workline", workline)
  }

  const handleWorklineSwitch = () => {
    setShowWorklineSelector(true)
  }

  if (showWorklineSelector) {
    return (
      <ProtectedRoute>
        <WorklineSelector onWorklineSelected={handleWorklineSelected} />
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-100">
        <AdminSidebar currentWorkline={selectedWorkline} onWorklineSwitch={handleWorklineSwitch} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminHeader currentWorkline={selectedWorkline} onWorklineSwitch={handleWorklineSwitch} />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
