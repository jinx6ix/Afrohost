import { Router } from "express"
import { connectToDatabase } from "../../config/database"
import { authenticate, authorize, requireWorkline, type AuthRequest } from "../../middleware/auth"
import { createError } from "../../middleware/errorHandler"
import { ObjectId } from "mongodb"

const router = Router()

// Apply hosting workline requirement
router.use(requireWorkline("hosting"))

// Get servers
router.get("/", authenticate, authorize("read"), async (req: AuthRequest, res, next) => {
  try {
    const page = Number.parseInt(req.query.page as string) || 1
    const limit = Number.parseInt(req.query.limit as string) || 10
    const status = (req.query.status as string) || ""
    const type = (req.query.type as string) || ""
    const location = (req.query.location as string) || ""

    const db = await connectToDatabase()
    const servers = db.collection("hosting_servers")

    const filter: any = {}
    if (status && status !== "all") filter.status = status
    if (type && type !== "all") filter.type = type
    if (location && location !== "all") filter.location = location

    const skip = (page - 1) * limit
    const totalServers = await servers.countDocuments(filter)
    const serverList = await servers.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 }).toArray()

    res.json({
      servers: serverList.map((server) => ({ ...server, _id: server._id.toString() })),
      pagination: {
        page,
        limit,
        total: totalServers,
        pages: Math.ceil(totalServers / limit),
      },
    })
  } catch (error) {
    next(error)
  }
})

// Create server
router.post("/", authenticate, authorize("manage_servers"), async (req: AuthRequest, res, next) => {
  try {
    const {
      name,
      type,
      location,
      ipAddress,
      specifications,
      operatingSystem,
      status = "active",
      clientId,
      monthlyPrice,
    } = req.body

    const db = await connectToDatabase()
    const servers = db.collection("hosting_servers")

    const newServer = {
      name,
      type,
      location,
      ipAddress,
      specifications,
      operatingSystem,
      status,
      clientId: clientId ? new ObjectId(clientId) : null,
      monthlyPrice,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: new ObjectId(req.user!.userId),
    }

    const result = await servers.insertOne(newServer)

    res.status(201).json({
      message: "Server created successfully",
      server: { ...newServer, _id: result.insertedId.toString() },
    })
  } catch (error) {
    next(error)
  }
})

// Update server
router.put("/:id", authenticate, authorize("manage_servers"), async (req: AuthRequest, res, next) => {
  try {
    const { id } = req.params
    const updates = req.body

    if (!ObjectId.isValid(id)) {
      throw createError("Invalid server ID", 400)
    }

    const db = await connectToDatabase()
    const servers = db.collection("hosting_servers")

    if (updates.clientId) {
      updates.clientId = new ObjectId(updates.clientId)
    }

    const result = await servers.updateOne({ _id: new ObjectId(id) }, { $set: { ...updates, updatedAt: new Date() } })

    if (result.matchedCount === 0) {
      throw createError("Server not found", 404)
    }

    const updatedServer = await servers.findOne({ _id: new ObjectId(id) })

    res.json({
      message: "Server updated successfully",
      server: { ...updatedServer, _id: updatedServer!._id.toString() },
    })
  } catch (error) {
    next(error)
  }
})

export default router
