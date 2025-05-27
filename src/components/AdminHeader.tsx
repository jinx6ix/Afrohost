"use client"

import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Bell, LogOut, Settings, User, RefreshCw, Shield, Server } from "lucide-react"

interface AdminHeaderProps {
  currentWorkline: "cybersecurity" | "hosting" | null
  onWorklineSwitch: () => void
}

export function AdminHeader({ currentWorkline, onWorklineSwitch }: AdminHeaderProps) {
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  const getWorklineIcon = () => {
    if (currentWorkline === "cybersecurity") return <Shield className="h-4 w-4" />
    if (currentWorkline === "hosting") return <Server className="h-4 w-4" />
    return null
  }

  const getWorklineColor = () => {
    if (currentWorkline === "cybersecurity") return "bg-blue-100 text-blue-800"
    if (currentWorkline === "hosting") return "bg-green-100 text-green-800"
    return "bg-gray-100 text-gray-800"
  }

  return (
    <header className="bg-white shadow-sm border-b h-16 flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        <h2 className="text-lg font-semibold text-gray-900">Multi-Service Dashboard</h2>
        {currentWorkline && (
          <Badge className={getWorklineColor()}>
            {getWorklineIcon()}
            <span className="ml-1 capitalize">{currentWorkline}</span>
          </Badge>
        )}
      </div>

      <div className="flex items-center space-x-4">
        {/* Workline Switch Button */}
        <Button variant="outline" size="sm" onClick={onWorklineSwitch}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Switch Workline
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
            3
          </span>
        </Button>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarFallback>{user?.name?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.name}</p>
                <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                <div className="flex items-center space-x-1 mt-1">
                  <Badge variant="outline" className="text-xs">
                    {user?.role}
                  </Badge>
                  {user?.worklines && user.worklines.length > 1 && (
                    <Badge variant="secondary" className="text-xs">
                      Multi-workline
                    </Badge>
                  )}
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onWorklineSwitch}>
              <RefreshCw className="mr-2 h-4 w-4" />
              <span>Switch Workline</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
