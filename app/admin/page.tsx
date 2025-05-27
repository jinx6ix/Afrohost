import type React from "react"
import Link from "next/link"
import { Users, Calendar, FileText } from "lucide-react"

import { MainNav } from "@/components/main-nav"
import { SidebarNav } from "@/components/sidebar-nav"
import { siteConfig } from "@/config/site"

interface DashboardLayoutProps {
  children: React.ReactNode
}

const sidebarNavItems = [
  {
    title: "Overview",
    href: "/admin",
    icon: "overview",
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: "settings",
  },
]

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="border-b">
        <div className="container flex h-16 items-center">
          <MainNav className="mx-6" items={siteConfig.mainNav} />
          <div className="ml-auto flex items-center space-x-4">
            <p>Admin Dashboard</p>
          </div>
        </div>
      </header>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <main className="flex-1">
          {/* Add this after the existing navigation tabs */}
          <div className="flex space-x-4 mb-6">
            <Link href="/admin/users">
              <Button variant="outline">
                <Users className="w-4 h-4 mr-2" />
                Users
              </Button>
            </Link>
            <Link href="/admin/tasks">
              <Button variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Tasks
              </Button>
            </Link>
            <Link href="/admin/pages">
              <Button variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                Pages
              </Button>
            </Link>
          </div>
          {children}
        </main>
      </div>
    </div>
  )
}

import { Button } from "@/components/ui/button"
