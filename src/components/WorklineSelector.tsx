"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { authAPI } from "@/lib/api"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, Server, ArrowRight, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/useToast"

interface WorklineSelectorProps {
  onWorklineSelected: (workline: "cybersecurity" | "hosting") => void
}

export function WorklineSelector({ onWorklineSelected }: WorklineSelectorProps) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const handleWorklineSwitch = async (workline: "cybersecurity" | "hosting") => {
    if (!user?.worklines?.includes(workline)) {
      toast({
        title: "Access Denied",
        description: `You don't have access to the ${workline} workline.`,
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const response = await authAPI.switchWorkline(workline)

      // Update token in localStorage
      localStorage.setItem("token", response.token)
      localStorage.setItem("workline", workline)

      toast({
        title: "Workline Switched",
        description: `Successfully switched to ${workline} workline.`,
      })

      onWorklineSelected(workline)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to switch workline. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Select Your Workline</h1>
          <p className="text-gray-600 mt-2">Choose the service area you want to work with today</p>
          <div className="flex items-center justify-center space-x-2 mt-4">
            <Badge variant="outline">Welcome, {user?.name}</Badge>
            <Badge variant="secondary">{user?.role}</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Cybersecurity Workline */}
          <Card
            className={`cursor-pointer transition-all hover:shadow-lg ${
              user?.worklines?.includes("cybersecurity") ? "border-blue-500" : "border-gray-200 opacity-50"
            }`}
          >
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-xl">Cybersecurity</CardTitle>
              <CardDescription>Manage security incidents, threats, and protection tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Incident Management
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Threat Analysis
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Security Tasks
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Client Protection
                </div>
              </div>

              <Button
                className="w-full"
                onClick={() => handleWorklineSwitch("cybersecurity")}
                disabled={!user?.worklines?.includes("cybersecurity") || loading}
              >
                {loading ? (
                  "Switching..."
                ) : (
                  <>
                    Enter Cybersecurity
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>

              {!user?.worklines?.includes("cybersecurity") && (
                <p className="text-xs text-red-500 text-center">Access not granted for this workline</p>
              )}
            </CardContent>
          </Card>

          {/* Web Hosting Workline */}
          <Card
            className={`cursor-pointer transition-all hover:shadow-lg ${
              user?.worklines?.includes("hosting") ? "border-green-500" : "border-gray-200 opacity-50"
            }`}
          >
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Server className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-xl">Web Hosting</CardTitle>
              <CardDescription>Manage servers, domains, and hosting infrastructure</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Server Management
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Domain Administration
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Hosting Tasks
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Client Support
                </div>
              </div>

              <Button
                className="w-full"
                variant="outline"
                onClick={() => handleWorklineSwitch("hosting")}
                disabled={!user?.worklines?.includes("hosting") || loading}
              >
                {loading ? (
                  "Switching..."
                ) : (
                  <>
                    Enter Web Hosting
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>

              {!user?.worklines?.includes("hosting") && (
                <p className="text-xs text-red-500 text-center">Access not granted for this workline</p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500">You can switch between worklines at any time from the dashboard</p>
        </div>
      </div>
    </div>
  )
}
