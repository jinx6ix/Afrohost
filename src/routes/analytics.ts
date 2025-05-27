import { Router } from "express"
import { connectToDatabase } from "../config/database"
import { authenticate, authorize, type AuthRequest } from "../middleware/auth"

const router = Router()

// Get unified dashboard analytics
router.get("/dashboard", authenticate, authorize("view_analytics"), async (req: AuthRequest, res, next) => {
  try {
    const db = await connectToDatabase()
    const users = db.collection("users")

    // User statistics
    const totalUsers = await users.countDocuments()
    const activeUsers = await users.countDocuments({ isActive: true })
    const cyberUsers = await users.countDocuments({ worklines: "cybersecurity" })
    const hostingUsers = await users.countDocuments({ worklines: "hosting" })

    // Cybersecurity statistics
    const cyberTasks = db.collection("cyber_tasks")
    const cyberIncidents = db.collection("cyber_incidents")

    const totalCyberTasks = await cyberTasks.countDocuments()
    const pendingCyberTasks = await cyberTasks.countDocuments({ status: "pending" })
    const totalIncidents = await cyberIncidents.countDocuments()
    const openIncidents = await cyberIncidents.countDocuments({ status: "open" })

    // Hosting statistics
    const hostingTasks = db.collection("hosting_tasks")
    const hostingServers = db.collection("hosting_servers")
    const hostingDomains = db.collection("hosting_domains")

    const totalHostingTasks = await hostingTasks.countDocuments()
    const pendingHostingTasks = await hostingTasks.countDocuments({ status: "pending" })
    const totalServers = await hostingServers.countDocuments()
    const activeServers = await hostingServers.countDocuments({ status: "active" })
    const totalDomains = await hostingDomains.countDocuments()

    // Recent activity across both worklines
    const recentCyberTasks = await cyberTasks
      .find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .project({ title: 1, status: 1, priority: 1, createdAt: 1 })
      .toArray()

    const recentHostingTasks = await hostingTasks
      .find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .project({ title: 1, status: 1, priority: 1, createdAt: 1 })
      .toArray()

    const recentIncidents = await cyberIncidents
      .find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .project({ title: 1, severity: 1, status: 1, createdAt: 1 })
      .toArray()

    res.json({
      overview: {
        totalUsers,
        activeUsers,
        cyberUsers,
        hostingUsers,
      },
      cybersecurity: {
        tasks: {
          total: totalCyberTasks,
          pending: pendingCyberTasks,
          completed: totalCyberTasks - pendingCyberTasks,
        },
        incidents: {
          total: totalIncidents,
          open: openIncidents,
          resolved: totalIncidents - openIncidents,
        },
      },
      hosting: {
        tasks: {
          total: totalHostingTasks,
          pending: pendingHostingTasks,
          completed: totalHostingTasks - pendingHostingTasks,
        },
        infrastructure: {
          servers: totalServers,
          activeServers,
          domains: totalDomains,
        },
      },
      recentActivity: {
        cyberTasks: recentCyberTasks.map((task) => ({ ...task, _id: task._id.toString(), workline: "cybersecurity" })),
        hostingTasks: recentHostingTasks.map((task) => ({
          ...task,
          _id: task._id.toString(),
          workline: "hosting",
        })),
        incidents: recentIncidents.map((incident) => ({ ...incident, _id: incident._id.toString() })),
      },
    })
  } catch (error) {
    next(error)
  }
})

// Get workline-specific analytics
router.get("/workline/:workline", authenticate, authorize("view_analytics"), async (req: AuthRequest, res, next) => {
  try {
    const { workline } = req.params
    const db = await connectToDatabase()

    if (workline === "cybersecurity") {
      const cyberTasks = db.collection("cyber_tasks")
      const cyberIncidents = db.collection("cyber_incidents")
      const cyberClients = db.collection("cyber_clients")

      const taskStats = await cyberTasks
        .aggregate([
          {
            $group: {
              _id: "$status",
              count: { $sum: 1 },
            },
          },
        ])
        .toArray()

      const incidentStats = await cyberIncidents
        .aggregate([
          {
            $group: {
              _id: "$severity",
              count: { $sum: 1 },
            },
          },
        ])
        .toArray()

      const totalClients = await cyberClients.countDocuments()

      res.json({
        workline: "cybersecurity",
        tasks: taskStats,
        incidents: incidentStats,
        clients: totalClients,
      })
    } else if (workline === "hosting") {
      const hostingTasks = db.collection("hosting_tasks")
      const hostingServers = db.collection("hosting_servers")
      const hostingClients = db.collection("hosting_clients")
      const hostingDomains = db.collection("hosting_domains")

      const taskStats = await hostingTasks
        .aggregate([
          {
            $group: {
              _id: "$status",
              count: { $sum: 1 },
            },
          },
        ])
        .toArray()

      const serverStats = await hostingServers
        .aggregate([
          {
            $group: {
              _id: "$status",
              count: { $sum: 1 },
            },
          },
        ])
        .toArray()

      const totalClients = await hostingClients.countDocuments()
      const totalDomains = await hostingDomains.countDocuments()

      res.json({
        workline: "hosting",
        tasks: taskStats,
        servers: serverStats,
        clients: totalClients,
        domains: totalDomains,
      })
    } else {
      res.status(400).json({ error: "Invalid workline" })
    }
  } catch (error) {
    next(error)
  }
})

export default router
