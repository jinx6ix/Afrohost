import type { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  // Server-Sent Events endpoint for real-time data
  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    start(controller) {
      const sendData = () => {
        const data = {
          timestamp: new Date().toISOString(),
          cybersecurity: {
            threatsBlocked: Math.floor(Math.random() * 1000) + 15000,
            activeMonitoring: Math.floor(Math.random() * 100) + 1200,
            securityAlerts: Math.floor(Math.random() * 10),
            responseTime: Math.floor(Math.random() * 20) + 15,
          },
          hosting: {
            websitesHosted: Math.floor(Math.random() * 100) + 8900,
            serverLoad: Math.floor(Math.random() * 40) + 50,
            bandwidth: Math.random() * 2 + 2,
            activeUsers: Math.floor(Math.random() * 200) + 2000,
          },
          global: {
            totalRevenue: Math.floor(Math.random() * 1000) + 145000,
            newSignups: Math.floor(Math.random() * 10) + 85,
            supportTickets: Math.floor(Math.random() * 20) + 5,
            systemHealth: Math.random() * 2 + 97,
          },
        }

        const sseData = `data: ${JSON.stringify(data)}\n\n`
        controller.enqueue(encoder.encode(sseData))
      }

      // Send initial data
      sendData()

      // Send updates every 3 seconds
      const interval = setInterval(sendData, 3000)

      // Cleanup on close
      request.signal.addEventListener("abort", () => {
        clearInterval(interval)
        controller.close()
      })
    },
  })

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  })
}
