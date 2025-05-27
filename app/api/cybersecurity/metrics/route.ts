import { NextResponse } from "next/server"

export async function GET() {
  try {
    const metrics = {
      threatsBlocked: Math.floor(Math.random() * 1000) + 15000,
      activeMonitoring: Math.floor(Math.random() * 100) + 1200,
      securityAlerts: Math.floor(Math.random() * 10),
      uptime: 99.98,
      responseTime: Math.floor(Math.random() * 20) + 15,
      timestamp: new Date().toISOString(),
    }

    return NextResponse.json(metrics)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch cybersecurity metrics" }, { status: 500 })
  }
}
