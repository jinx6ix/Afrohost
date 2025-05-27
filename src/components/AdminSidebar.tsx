"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { hasPermission } from "@/lib/auth"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  CheckSquare,
  FileText,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Shield,
  Server,
  AlertTriangle,
  Globe,
  Database,
  RefreshCw,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface AdminSidebarProps {
  currentWorkline: "cybersecurity" | "hosting" | null
  onWorklineSwitch: () => void
}

const commonNavigation = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
    permission: "read",
  },
  {
    name: "Users",
    href: "/admin/users",
    icon: Users,
    permission: "manage_users",
  },
  {
    name: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
    permission: "view_analytics",
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: Settings,
    permission: "read",
  },
]

const cyberNavigation = [
  {
    name: "Cyber Tasks",
    href: "/admin/cybersecurity/tasks",
    icon: CheckSquare,
    permission: "read",
  },
  {
    name: "Incidents",
    href: "/admin/cybersecurity/incidents",
    icon: AlertTriangle,
    permission: "manage_incidents",
  },
  {
    name: "Threats",
    href: "/admin/cybersecurity/threats",
    icon: Shield,
    permission: "read",
  },
  {
    name: "Cyber Clients",
    href: "/admin/cybersecurity/clients",
    icon: Users,
    permission: "manage_clients",
  },
  {
    name: "Cyber Pages",
    href: "/admin/cybersecurity/pages",
    icon: FileText,
    permission: "manage_pages",
  },
]

const hostingNavigation = [
  {
    name: "Hosting Tasks",
    href: "/admin/hosting/tasks",
    icon: CheckSquare,
    permission: "read",
  },
  {
    name: "Servers",
    href: "/admin/hosting/servers",
    icon: Server,
    permission: "manage_servers",
  },
  {
    name: "Domains",
    href: "/admin/hosting/domains",
    icon: Globe,
    permission: "manage_domains",
  },
  {
    name: "Hosting Clients",
    href: "/admin/hosting/clients",
    icon: Users,
    permission: "manage_clients",
  },
  {
    name: "Hosting Pages",
    href: "/admin/hosting/pages",
    icon: FileText,
    permission: "manage_pages",
  },
]

export function AdminSidebar({ currentWorkline, onWorklineSwitch }: AdminSidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()
  const { user } = useAuth()

  const getWorklineNavigation = () => {
    if (currentWorkline === "cybersecurity") {
      return cyberNavigation
    } else if (currentWorkline === "hosting") {
      return hostingNavigation
    }
    return []
  }

  const filteredCommonNav = commonNavigation.filter((item) =>
    user ? hasPermission(user.role, item.permission) : false,
  )

  const filteredWorklineNav = getWorklineNavigation().filter((item) =>
    user ? hasPermission(user.role, item.permission) : false,
  )

  const getWorklineIcon = () => {
    if (currentWorkline === "cybersecurity") return Shield
    if (currentWorkline === "hosting") return Server
    return Database
  }

  const WorklineIcon = getWorklineIcon()

  return (
    <div className={cn("bg-white shadow-lg transition-all duration-300 ease-in-out", collapsed ? "w-16" : "w-64")}>
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex h-16 items-center justify-between px-4 border-b">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <WorklineIcon className="h-6 w-6 text-blue-600" />
              <h1 className="text-lg font-bold text-gray-900">
                {currentWorkline ? currentWorkline.charAt(0).toUpperCase() + currentWorkline.slice(1) : "Admin"}
              </h1>
            </div>
          )}
          <Button variant="ghost" size="sm" onClick={() => setCollapsed(!collapsed)} className="p-2">
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        {/* Workline Selector */}
        {!collapsed && (
          <div className="p-4 border-b">
            <Button variant="outline" size="sm" onClick={onWorklineSwitch} className="w-full justify-start">
              <RefreshCw className="h-4 w-4 mr-2" />
              Switch Workline
            </Button>
            {currentWorkline && (
              <Badge variant="secondary" className="mt-2 w-full justify-center">
                {currentWorkline}
              </Badge>
            )}
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-2 py-4 overflow-y-auto">
          {/* Common Navigation */}
          <div className="space-y-1">
            {!collapsed && <p className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">General</p>}
            {filteredCommonNav.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive ? "bg-blue-100 text-blue-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                  )}
                >
                  <item.icon
                    className={cn(
                      "flex-shrink-0 h-5 w-5",
                      isActive ? "text-blue-500" : "text-gray-400 group-hover:text-gray-500",
                    )}
                  />
                  {!collapsed && <span className="ml-3 truncate">{item.name}</span>}
                </Link>
              )
            })}
          </div>

          {/* Workline-specific Navigation */}
          {filteredWorklineNav.length > 0 && (
            <div className="space-y-1 pt-4">
              {!collapsed && (
                <p className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">{currentWorkline}</p>
              )}
              {filteredWorklineNav.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                      isActive ? "bg-blue-100 text-blue-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                    )}
                  >
                    <item.icon
                      className={cn(
                        "flex-shrink-0 h-5 w-5",
                        isActive ? "text-blue-500" : "text-gray-400 group-hover:text-gray-500",
                      )}
                    />
                    {!collapsed && <span className="ml-3 truncate">{item.name}</span>}
                  </Link>
                )
              })}
            </div>
          )}
        </nav>

        {/* User info */}
        {!collapsed && user && (
          <div className="border-t p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                  <span className="text-sm font-medium text-white">{user.name.charAt(0).toUpperCase()}</span>
                </div>
              </div>
              <div className="ml-3 min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                <p className="text-xs text-gray-500 truncate">{user.role}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
