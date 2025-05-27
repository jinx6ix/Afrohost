import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/contexts/AuthContext"
import { ToastProvider } from "@/components/ui/toast"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Multi-Site Dashboard",
  description: "Admin dashboard for managing multiple websites",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ToastProvider>
            {children}
            <Toaster />
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
