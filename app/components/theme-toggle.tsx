"use client"
import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import React from "react"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="border-slate-600 bg-slate-800/50 hover:bg-slate-700/50 dark:border-slate-600 dark:bg-slate-800/50 dark:hover:bg-slate-700/50 transition-all duration-300 hover:scale-110"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-slate-900 border-slate-700 dark:bg-slate-900 dark:border-slate-700"
      >
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="text-gray-300 hover:text-white hover:bg-slate-800 dark:text-gray-300 dark:hover:text-white dark:hover:bg-slate-800 cursor-pointer"
        >
          <Sun className="mr-2 h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="text-gray-300 hover:text-white hover:bg-slate-800 dark:text-gray-300 dark:hover:text-white dark:hover:bg-slate-800 cursor-pointer"
        >
          <Moon className="mr-2 h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="text-gray-300 hover:text-white hover:bg-slate-800 dark:text-gray-300 dark:hover:text-white dark:hover:bg-slate-800 cursor-pointer"
        >
          <Monitor className="mr-2 h-4 w-4" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
