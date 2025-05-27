"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Server, Menu, X, ChevronDown } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { ThemeToggle } from "./theme-toggle"
import React from "react"

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    {
      name: "Hosting",
      href: "/hosting",
      dropdown: [
        { name: "Shared Hosting", href: "/hosting/shared" },
        { name: "VPS Hosting", href: "/hosting/vps" },
        { name: "Dedicated Servers", href: "/hosting/dedicated" },
        { name: "Cloud Hosting", href: "/hosting/cloud" },
      ],
    },
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    { name: "Support", href: "/support" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 transition-colors duration-300">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg group-hover:scale-110 transition-transform duration-300">
              <Server className="h-6 w-6 text-cyan-400 group-hover:animate-pulse" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              HostPro
            </span>
          </Link>

          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.name}>
                {item.dropdown ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-cyan-400 dark:hover:text-cyan-400 transition-colors">
                      <span>{item.name}</span>
                      <ChevronDown className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-700">
                      {item.dropdown.map((subItem) => (
                        <DropdownMenuItem key={subItem.name} asChild>
                          <Link
                            href={subItem.href}
                            className="text-gray-700 dark:text-gray-300 hover:text-cyan-400 dark:hover:text-cyan-400"
                          >
                            {subItem.name}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    href={item.href}
                    className={`transition-colors hover:text-cyan-400 dark:hover:text-cyan-400 transform hover:scale-105 duration-300 ${
                      isActive(item.href) ? "text-cyan-400" : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            <ThemeToggle />
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 hover:scale-105 transition-all duration-300">
              Get Started
            </Button>
          </div>

          <div className="lg:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button
              className="hover:scale-110 transition-transform duration-300 text-gray-700 dark:text-gray-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-t border-gray-200 dark:border-slate-800 animate-slide-down">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {navItems.map((item) => (
              <div key={item.name}>
                <Link
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block py-2 hover:text-cyan-400 dark:hover:text-cyan-400 transition-colors transform hover:translate-x-2 duration-300 ${
                    isActive(item.href) ? "text-cyan-400" : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {item.name}
                </Link>
                {item.dropdown && (
                  <div className="ml-4 space-y-2">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="block py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-cyan-400 dark:hover:text-cyan-400 transition-colors transform hover:translate-x-2 duration-300"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:scale-105 transition-all duration-300">
              Get Started
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}
