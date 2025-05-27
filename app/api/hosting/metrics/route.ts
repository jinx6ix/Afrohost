import { NextResponse } from "next/server"

export async function GET() {
  try {
    const metrics = {
      websitesHosted: Math.floor(Math.random() * 100) + 8900,
      serverLoad: Math.floor(Math.random() * 40) + 50,
      bandwidth: Math.random() * 2 + 2,
      uptime: 99.99,
      activeUsers: Math.floor(Math.random() * 200) + 2000,
      timestamp: new Date().toISOString(),
    }

    return NextResponse.json(metrics)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch hosting metrics" }, { status: 500 })
  }
}
