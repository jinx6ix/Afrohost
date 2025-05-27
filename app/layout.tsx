import React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "./components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "HostPro - Premium Web Hosting Solutions",
  description:
    "Experience lightning-fast hosting with 99.9% uptime, advanced security, and 24/7 expert support. Your website deserves the best infrastructure.",
  keywords: "web hosting, cloud hosting, VPS, dedicated servers, domain registration",
  authors: [{ name: "HostPro Team" }],
  viewport: "width=device-width, initial-scale=1",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
