import express from "express"
import { ObjectId } from "mongodb"
import { getDb } from "../../config/database"
import { authenticateToken, requireRole } from "../../middleware/auth"
import { validateRequest } from "../../middleware/validation"
import { body, param } from "express-validator"

const router = express.Router()

// Validation schemas
const createThreatValidation = [
  body("name").notEmpty().withMessage("Threat name is required"),
  body("type")
    .isIn(["malware", "phishing", "ddos", "ransomware", "insider", "apt", "other"])
    .withMessage("Valid threat type is required"),
  body("severity").isIn(["low", "medium", "high", "critical"]).withMessage("Valid severity level is required"),
  body("description").notEmpty().withMessage("Threat description is required"),
  body("source").notEmpty().withMessage("Threat source is required"),
]

const updateThreatValidation = [
  param("id").isMongoId().withMessage("Valid threat ID is required"),
  body("name").optional().notEmpty().withMessage("Threat name cannot be empty"),
  body("type")
    .optional()
    .isIn(["malware", "phishing", "ddos", "ransomware", "insider", "apt", "other"])
    .withMessage("Valid threat type is required"),
  body("severity")
    .optional()
    .isIn(["low", "medium", "high", "critical"])
    .withMessage("Valid severity level is required"),
]

// GET /api/cybersecurity/threats - Get all threats
router.get("/", authenticateToken, async (req, res) => {
  try {
    const db = getDb()
    const { page = 1, limit = 10, search, type, severity, status } = req.query

    const filter: any = { workline: "cybersecurity" }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { source: { $regex: search, $options: "i" } },
      ]
    }

    if (type) filter.type = type
    if (severity) filter.severity = severity
    if (status) filter.status = status

    const threats = await db
      .collection("threats")
      .find(filter)
      .sort({ createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .toArray()

    const total = await db.collection("threats").countDocuments(filter)

    res.json({
      threats,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    })
  } catch (error) {
    console.error("Error fetching threats:", error)
    res.status(500).json({ error: "Failed to fetch threats" })
  }
})

// GET /api/cybersecurity/threats/:id - Get specific threat
router.get("/:id", authenticateToken, param("id").isMongoId(), validateRequest, async (req, res) => {
  try {
    const db = getDb()
    const threat = await db.collection("threats").findOne({
      _id: new ObjectId(req.params.id),
      workline: "cybersecurity",
    })

    if (!threat) {
      return res.status(404).json({ error: "Threat not found" })
    }

    res.json(threat)
  } catch (error) {
    console.error("Error fetching threat:", error)
    res.status(500).json({ error: "Failed to fetch threat" })
  }
})

// POST /api/cybersecurity/threats - Create new threat
router.post(
  "/",
  authenticateToken,
  requireRole(["admin", "manager", "analyst"]),
  createThreatValidation,
  validateRequest,
  async (req, res) => {
    try {
      const db = getDb()
      const threatData = {
        ...req.body,
        workline: "cybersecurity",
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: req.user.userId,
        status: "active",
        affectedSystems: [],
        mitigationSteps: [],
        indicators: [],
      }

      const result = await db.collection("threats").insertOne(threatData)
      const threat = await db.collection("threats").findOne({ _id: result.insertedId })

      res.status(201).json(threat)
    } catch (error) {
      console.error("Error creating threat:", error)
      res.status(500).json({ error: "Failed to create threat" })
    }
  },
)

// PUT /api/cybersecurity/threats/:id - Update threat
router.put(
  "/:id",
  authenticateToken,
  requireRole(["admin", "manager", "analyst"]),
  updateThreatValidation,
  validateRequest,
  async (req, res) => {
    try {
      const db = getDb()
      const updateData = {
        ...req.body,
        updatedAt: new Date(),
        updatedBy: req.user.userId,
      }

      const result = await db
        .collection("threats")
        .findOneAndUpdate(
          { _id: new ObjectId(req.params.id), workline: "cybersecurity" },
          { $set: updateData },
          { returnDocument: "after" },
        )

      if (!result.value) {
        return res.status(404).json({ error: "Threat not found" })
      }

      res.json(result.value)
    } catch (error) {
      console.error("Error updating threat:", error)
      res.status(500).json({ error: "Failed to update threat" })
    }
  },
)

// DELETE /api/cybersecurity/threats/:id - Delete threat
router.delete(
  "/:id",
  authenticateToken,
  requireRole(["admin"]),
  param("id").isMongoId(),
  validateRequest,
  async (req, res) => {
    try {
      const db = getDb()
      const result = await db.collection("threats").deleteOne({
        _id: new ObjectId(req.params.id),
        workline: "cybersecurity",
      })

      if (result.deletedCount === 0) {
        return res.status(404).json({ error: "Threat not found" })
      }

      res.json({ message: "Threat deleted successfully" })
    } catch (error) {
      console.error("Error deleting threat:", error)
      res.status(500).json({ error: "Failed to delete threat" })
    }
  },
)

// POST /api/cybersecurity/threats/:id/indicators - Add threat indicators
router.post("/:id/indicators", authenticateToken, requireRole(["admin", "manager", "analyst"]), async (req, res) => {
  try {
    const db = getDb()
    const { indicators } = req.body

    const result = await db.collection("threats").findOneAndUpdate(
      { _id: new ObjectId(req.params.id), workline: "cybersecurity" },
      {
        $push: { indicators: { $each: indicators } },
        $set: { updatedAt: new Date(), updatedBy: req.user.userId },
      },
      { returnDocument: "after" },
    )

    if (!result.value) {
      return res.status(404).json({ error: "Threat not found" })
    }

    res.json(result.value)
  } catch (error) {
    console.error("Error adding threat indicators:", error)
    res.status(500).json({ error: "Failed to add threat indicators" })
  }
})

export default router
