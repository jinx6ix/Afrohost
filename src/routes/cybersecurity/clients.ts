import express from "express"
import { ObjectId } from "mongodb"
import { getDb } from "../../config/database"
import { authenticateToken, requireRole } from "../../middleware/auth"
import { validateRequest } from "../../middleware/validation"
import { body, param } from "express-validator"

const router = express.Router()

// Validation schemas
const createClientValidation = [
  body("name").notEmpty().withMessage("Client name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("company").notEmpty().withMessage("Company name is required"),
  body("industry").notEmpty().withMessage("Industry is required"),
  body("riskLevel").isIn(["low", "medium", "high", "critical"]).withMessage("Valid risk level is required"),
  body("services").isArray().withMessage("Services must be an array"),
]

const updateClientValidation = [
  param("id").isMongoId().withMessage("Valid client ID is required"),
  body("name").optional().notEmpty().withMessage("Client name cannot be empty"),
  body("email").optional().isEmail().withMessage("Valid email is required"),
  body("riskLevel").optional().isIn(["low", "medium", "high", "critical"]).withMessage("Valid risk level is required"),
]

// GET /api/cybersecurity/clients - Get all cybersecurity clients
router.get("/", authenticateToken, async (req, res) => {
  try {
    const db = getDb()
    const { page = 1, limit = 10, search, riskLevel, industry } = req.query

    const filter: any = { workline: "cybersecurity" }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ]
    }

    if (riskLevel) filter.riskLevel = riskLevel
    if (industry) filter.industry = industry

    const clients = await db
      .collection("clients")
      .find(filter)
      .sort({ createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .toArray()

    const total = await db.collection("clients").countDocuments(filter)

    res.json({
      clients,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    })
  } catch (error) {
    console.error("Error fetching cybersecurity clients:", error)
    res.status(500).json({ error: "Failed to fetch clients" })
  }
})

// GET /api/cybersecurity/clients/:id - Get specific client
router.get("/:id", authenticateToken, param("id").isMongoId(), validateRequest, async (req, res) => {
  try {
    const db = getDb()
    const client = await db.collection("clients").findOne({
      _id: new ObjectId(req.params.id),
      workline: "cybersecurity",
    })

    if (!client) {
      return res.status(404).json({ error: "Client not found" })
    }

    res.json(client)
  } catch (error) {
    console.error("Error fetching client:", error)
    res.status(500).json({ error: "Failed to fetch client" })
  }
})

// POST /api/cybersecurity/clients - Create new client
router.post(
  "/",
  authenticateToken,
  requireRole(["admin", "manager"]),
  createClientValidation,
  validateRequest,
  async (req, res) => {
    try {
      const db = getDb()
      const clientData = {
        ...req.body,
        workline: "cybersecurity",
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: req.user.userId,
        status: "active",
        lastSecurityAssessment: null,
        securityScore: 0,
        incidentCount: 0,
      }

      const result = await db.collection("clients").insertOne(clientData)
      const client = await db.collection("clients").findOne({ _id: result.insertedId })

      res.status(201).json(client)
    } catch (error) {
      console.error("Error creating client:", error)
      res.status(500).json({ error: "Failed to create client" })
    }
  },
)

// PUT /api/cybersecurity/clients/:id - Update client
router.put(
  "/:id",
  authenticateToken,
  requireRole(["admin", "manager"]),
  updateClientValidation,
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
        .collection("clients")
        .findOneAndUpdate(
          { _id: new ObjectId(req.params.id), workline: "cybersecurity" },
          { $set: updateData },
          { returnDocument: "after" },
        )

      if (!result.value) {
        return res.status(404).json({ error: "Client not found" })
      }

      res.json(result.value)
    } catch (error) {
      console.error("Error updating client:", error)
      res.status(500).json({ error: "Failed to update client" })
    }
  },
)

// DELETE /api/cybersecurity/clients/:id - Delete client
router.delete(
  "/:id",
  authenticateToken,
  requireRole(["admin"]),
  param("id").isMongoId(),
  validateRequest,
  async (req, res) => {
    try {
      const db = getDb()
      const result = await db.collection("clients").deleteOne({
        _id: new ObjectId(req.params.id),
        workline: "cybersecurity",
      })

      if (result.deletedCount === 0) {
        return res.status(404).json({ error: "Client not found" })
      }

      res.json({ message: "Client deleted successfully" })
    } catch (error) {
      console.error("Error deleting client:", error)
      res.status(500).json({ error: "Failed to delete client" })
    }
  },
)

// GET /api/cybersecurity/clients/:id/security-assessment - Get client security assessment
router.get(
  "/:id/security-assessment",
  authenticateToken,
  param("id").isMongoId(),
  validateRequest,
  async (req, res) => {
    try {
      const db = getDb()
      const assessment = await db.collection("securityAssessments").findOne({
        clientId: new ObjectId(req.params.id),
        workline: "cybersecurity",
      })

      res.json(assessment || { message: "No security assessment found" })
    } catch (error) {
      console.error("Error fetching security assessment:", error)
      res.status(500).json({ error: "Failed to fetch security assessment" })
    }
  },
)

export default router
