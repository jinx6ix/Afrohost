import { Router } from "express"
import { connectToDatabase } from "../../config/database"
import { authenticate, authorize, requireWorkline, type AuthRequest } from "../../middleware/auth"
import { createError } from "../../middleware/errorHandler"
import { ObjectId } from "mongodb"

const router = Router()

// Apply cybersecurity workline requirement
router.use(requireWorkline("cybersecurity"))

// Get incidents
router.get("/", authenticate, authorize("read"), async (req: AuthRequest, res, next) => {
  try {
    const page = Number.parseInt(req.query.page as string) || 1
    const limit = Number.parseInt(req.query.limit as string) || 10
    const severity = (req.query.severity as string) || ""
    const status = (req.query.status as string) || ""
    const type = (req.query.type as string) || ""

    const db = await connectToDatabase()
    const incidents = db.collection("cyber_incidents")

    const filter: any = {}
    if (severity && severity !== "all") filter.severity = severity
    if (status && status !== "all") filter.status = status
    if (type && type !== "all") filter.type = type

    const skip = (page - 1) * limit
    const totalIncidents = await incidents.countDocuments(filter)
    const incidentList = await incidents.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 }).toArray()

    res.json({
      incidents: incidentList.map((incident) => ({ ...incident, _id: incident._id.toString() })),
      pagination: {
        page,
        limit,
        total: totalIncidents,
        pages: Math.ceil(totalIncidents / limit),
      },
    })
  } catch (error) {
    next(error)
  }
})

// Create incident
router.post("/", authenticate, authorize("manage_incidents"), async (req: AuthRequest, res, next) => {
  try {
    const {
      title,
      description,
      type,
      severity = "medium",
      affectedSystems = [],
      detectedAt,
      reportedBy,
      assignedTo,
    } = req.body

    const db = await connectToDatabase()
    const incidents = db.collection("cyber_incidents")

    const newIncident = {
      title,
      description,
      type,
      severity,
      status: "open",
      affectedSystems,
      detectedAt: detectedAt ? new Date(detectedAt) : new Date(),
      reportedBy: reportedBy || req.user!.userId,
      assignedTo: assignedTo ? new ObjectId(assignedTo) : null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await incidents.insertOne(newIncident)

    res.status(201).json({
      message: "Incident created successfully",
      incident: { ...newIncident, _id: result.insertedId.toString() },
    })
  } catch (error) {
    next(error)
  }
})

// Update incident
router.put("/:id", authenticate, authorize("manage_incidents"), async (req: AuthRequest, res, next) => {
  try {
    const { id } = req.params
    const updates = req.body

    if (!ObjectId.isValid(id)) {
      throw createError("Invalid incident ID", 400)
    }

    const db = await connectToDatabase()
    const incidents = db.collection("cyber_incidents")

    if (updates.assignedTo) {
      updates.assignedTo = new ObjectId(updates.assignedTo)
    }

    if (updates.detectedAt) {
      updates.detectedAt = new Date(updates.detectedAt)
    }

    const result = await incidents.updateOne({ _id: new ObjectId(id) }, { $set: { ...updates, updatedAt: new Date() } })

    if (result.matchedCount === 0) {
      throw createError("Incident not found", 404)
    }

    const updatedIncident = await incidents.findOne({ _id: new ObjectId(id) })

    res.json({
      message: "Incident updated successfully",
      incident: { ...updatedIncident, _id: updatedIncident!._id.toString() },
    })
  } catch (error) {
    next(error)
  }
})

export default router
