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
  body("plan").isIn(["shared", "vps", "dedicated", "cloud"]).withMessage("Valid hosting plan is required"),
  body("domain").notEmpty().withMessage("Domain is required"),
]

const updateClientValidation = [
  param("id").isMongoId().withMessage("Valid client ID is required"),
  body("name").optional().notEmpty().withMessage("Client name cannot be empty"),
  body("email").optional().isEmail().withMessage("Valid email is required"),
  body("plan").optional().isIn(["shared", "vps", "dedicated", "cloud"]).withMessage("Valid hosting plan is required"),
]

// GET /api/hosting/clients - Get all hosting clients
router.get("/", authenticateToken, async (req, res) => {
  try {
    const db = getDb()
    const { page = 1, limit = 10, search, plan, status } = req.query

    const filter: any = { workline: "hosting" }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { domain: { $regex: search, $options: "i" } },
      ]
    }

    if (plan) filter.plan = plan
    if (status) filter.status = status

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
    console.error("Error fetching hosting clients:", error)
    res.status(500).json({ error: "Failed to fetch clients" })
  }
})

// GET /api/hosting/clients/:id - Get specific client
router.get("/:id", authenticateToken, param("id").isMongoId(), validateRequest, async (req, res) => {
  try {
    const db = getDb()
    const client = await db.collection("clients").findOne({
      _id: new ObjectId(req.params.id),
      workline: "hosting",
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

// POST /api/hosting/clients - Create new client
router.post(
  "/",
  authenticateToken,
  requireRole(["admin", "manager"]),
  createClientValidation,
  validateRequest,
  async (req, res) => {
    try {
      const db = getDb()

      // Check if domain already exists
      const existingClient = await db.collection("clients").findOne({
        domain: req.body.domain,
        workline: "hosting",
      })

      if (existingClient) {
        return res.status(400).json({ error: "Client with this domain already exists" })
      }

      const clientData = {
        ...req.body,
        workline: "hosting",
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: req.user.userId,
        status: "active",
        bandwidth: 0,
        storage: 0,
        uptime: 99.9,
        lastBackup: null,
        supportTickets: 0,
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

// PUT /api/hosting/clients/:id - Update client
router.put(
  "/:id",
  authenticateToken,
  requireRole(["admin", "manager"]),
  updateClientValidation,
  validateRequest,
  async (req, res) => {
    try {
      const db = getDb()

      // Check if domain already exists (excluding current client)
      if (req.body.domain) {
        const existingClient = await db.collection("clients").findOne({
          domain: req.body.domain,
          workline: "hosting",
          _id: { $ne: new ObjectId(req.params.id) },
        })

        if (existingClient) {
          return res.status(400).json({ error: "Client with this domain already exists" })
        }
      }

      const updateData = {
        ...req.body,
        updatedAt: new Date(),
        updatedBy: req.user.userId,
      }

      const result = await db
        .collection("clients")
        .findOneAndUpdate(
          { _id: new ObjectId(req.params.id), workline: "hosting" },
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

// DELETE /api/hosting/clients/:id - Delete client
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
        workline: "hosting",
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

// GET /api/hosting/clients/:id/usage - Get client usage statistics
router.get("/:id/usage", authenticateToken, param("id").isMongoId(), validateRequest, async (req, res) => {
  try {
    const db = getDb()
    const usage = await db.collection("clientUsage").findOne({
      clientId: new ObjectId(req.params.id),
      workline: "hosting",
    })

    res.json(usage || { message: "No usage data found" })
  } catch (error) {
    console.error("Error fetching client usage:", error)
    res.status(500).json({ error: "Failed to fetch client usage" })
  }
})

export default router
