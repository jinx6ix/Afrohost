import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import compression from "compression"
import rateLimit from "express-rate-limit"
import dotenv from "dotenv"
import { connectToDatabase } from "./config/database"
import { errorHandler } from "./middleware/errorHandler"
import { notFound } from "./middleware/notFound"
import type { Application } from "express"


// Common Routes
import authRoutes from "./routes/auth"
import userRoutes from "./routes/users"
import analyticsRoutes from "./routes/analytics"

// Cybersecurity Routes
import cyberTaskRoutes from "./routes/cybersecurity/tasks"
import cyberPageRoutes from "./routes/cybersecurity/pages"
import cyberClientRoutes from "./routes/cybersecurity/clients"
import cyberIncidentRoutes from "./routes/cybersecurity/incidents"
import cyberThreatRoutes from "./routes/cybersecurity/threats"

// Web Hosting Routes
import hostingTaskRoutes from "./routes/hosting/tasks"
import hostingPageRoutes from "./routes/hosting/pages"
import hostingClientRoutes from "./routes/hosting/clients"
import hostingServerRoutes from "./routes/hosting/servers"
import hostingDomainRoutes from "./routes/hosting/domains"

dotenv.config()

const app: Application = express()
const PORT = process.env.PORT || 5000

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
})

// Middleware
app.use(helmet())
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  }),
)
app.use(compression())
app.use(morgan("combined"))
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true, limit: "10mb" }))
app.use("/api/", limiter)

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    services: {
      cybersecurity: "active",
      hosting: "active",
    },
  })
})

// Common API Routes
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/analytics", analyticsRoutes)

// Cybersecurity API Routes
app.use("/api/cybersecurity/tasks", cyberTaskRoutes)
app.use("/api/cybersecurity/pages", cyberPageRoutes)
app.use("/api/cybersecurity/clients", cyberClientRoutes)
app.use("/api/cybersecurity/incidents", cyberIncidentRoutes)
app.use("/api/cybersecurity/threats", cyberThreatRoutes)

// Web Hosting API Routes
app.use("/api/hosting/tasks", hostingTaskRoutes)
app.use("/api/hosting/pages", hostingPageRoutes)
app.use("/api/hosting/clients", hostingClientRoutes)
app.use("/api/hosting/servers", hostingServerRoutes)
app.use("/api/hosting/domains", hostingDomainRoutes)

// Error handling middleware
app.use(notFound)
app.use(errorHandler)

// Start server
async function startServer() {
  try {
    await connectToDatabase()
    console.log("✅ Connected to MongoDB")

    app.listen(PORT, () => {
      console.log(`🚀 Multi-Service Server running on port ${PORT}`)
      console.log(`📊 Health check: http://localhost:${PORT}/health`)
      console.log(`🔒 Cybersecurity API: http://localhost:${PORT}/api/cybersecurity/*`)
      console.log(`🌐 Web Hosting API: http://localhost:${PORT}/api/hosting/*`)
    })
  } catch (error) {
    console.error("❌ Failed to start server:", error)
    process.exit(1)
  }
}

startServer()

export default app
