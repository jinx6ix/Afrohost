import express from "express"
import { ObjectId } from "mongodb"
import { getDb } from "../../config/database"
import { authenticateToken, requireRole } from "../../middleware/auth"
import { validateRequest } from "../../middleware/validation"
import { body, param } from "express-validator"

const router = express.Router()

// Validation schemas
const createDomainValidation = [
  body("name").notEmpty().withMessage("Domain name is required"),
  body("clientId").isMongoId().withMessage("Valid client ID is required"),
  body("registrar").notEmpty().withMessage("Registrar is required"),
  body("expiryDate").isISO8601().withMessage("Valid expiry date is required"),
]

const updateDomainValidation = [
  param("id").isMongoId().withMessage("Valid domain ID is required"),
  body("name").optional().notEmpty().withMessage("Domain name cannot be empty"),
  body("registrar").optional().notEmpty().withMessage("Registrar cannot be empty"),
  body("expiryDate").optional().isISO8601().withMessage("Valid expiry date is required"),
]

// GET /api/hosting/domains - Get all domains
router.get("/", authenticateToken, async (req, res) => {
  try {
    const db = getDb()
    const { page = 1, limit = 10, search, status, registrar, clientId } = req.query

    const filter: any = { workline: "hosting" }

    if (search) {
      filter.$or = [{ name: { $regex: search, $options: "i" } }, { registrar: { $regex: search, $options: "i" } }]
    }

    if (status) filter.status = status
    if (registrar) filter.registrar = registrar
    if (clientId) filter.clientId = new ObjectId(clientId as string)

    const domains = await db
      .collection("domains")
      .aggregate([
        { $match: filter },
        {
          $lookup: {
            from: "clients",
            localField: "clientId",
            foreignField: "_id",
            as: "client",
          },
        },
        { $unwind: { path: "$client", preserveNullAndEmptyArrays: true } },
        { $sort: { createdAt: -1 } },
        { $skip: (Number(page) - 1) * Number(limit) },
        { $limit: Number(limit) },
      ])
      .toArray()

    const total = await db.collection("domains").countDocuments(filter)

    res.json({
      domains,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    })
  } catch (error) {
    console.error("Error fetching domains:", error)
    res.status(500).json({ error: "Failed to fetch domains" })
  }
})

// GET /api/hosting/domains/:id - Get specific domain
router.get("/:id", authenticateToken, param("id").isMongoId(), validateRequest, async (req, res) => {
  try {
    const db = getDb()
    const domain = await db
      .collection("domains")
      .aggregate([
        { $match: { _id: new ObjectId(req.params.id), workline: "hosting" } },
        {
          $lookup: {
            from: "clients",
            localField: "clientId",
            foreignField: "_id",
            as: "client",
          },
        },
        { $unwind: { path: "$client", preserveNullAndEmptyArrays: true } },
      ])
      .toArray()

    if (!domain.length) {
      return res.status(404).json({ error: "Domain not found" })
    }

    res.json(domain[0])
  } catch (error) {
    console.error("Error fetching domain:", error)
    res.status(500).json({ error: "Failed to fetch domain" })
  }
})

// POST /api/hosting/domains - Create new domain
router.post(
  "/",
  authenticateToken,
  requireRole(["admin", "manager"]),
  createDomainValidation,
  validateRequest,
  async (req, res) => {
    try {
      const db = getDb()

      // Check if domain already exists
      const existingDomain = await db.collection("domains").findOne({
        name: req.body.name,
        workline: "hosting",
      })

      if (existingDomain) {
        return res.status(400).json({ error: "Domain already exists" })
      }

      // Verify client exists
      const client = await db.collection("clients").findOne({
        _id: new ObjectId(req.body.clientId),
        workline: "hosting",
      })

      if (!client) {
        return res.status(400).json({ error: "Client not found" })
      }

      const domainData = {
        ...req.body,
        clientId: new ObjectId(req.body.clientId),
        workline: "hosting",
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: req.user.userId,
        status: "active",
        autoRenew: false,
        dnsRecords: [],
        sslStatus: "pending",
      }

      const result = await db.collection("domains").insertOne(domainData)
      const domain = await db.collection("domains").findOne({ _id: result.insertedId })

      res.status(201).json(domain)
    } catch (error) {
      console.error("Error creating domain:", error)
      res.status(500).json({ error: "Failed to create domain" })
    }
  },
)

// PUT /api/hosting/domains/:id - Update domain
router.put(
  "/:id",
  authenticateToken,
  requireRole(["admin", "manager"]),
  updateDomainValidation,
  validateRequest,
  async (req, res) => {
    try {
      const db = getDb()

      // Check if domain name already exists (excluding current domain)
      if (req.body.name) {
        const existingDomain = await db.collection("domains").findOne({
          name: req.body.name,
          workline: "hosting",
          _id: { $ne: new ObjectId(req.params.id) },
        })

        if (existingDomain) {
          return res.status(400).json({ error: "Domain with this name already exists" })
        }
      }

      const updateData = {
        ...req.body,
        updatedAt: new Date(),
        updatedBy: req.user.userId,
      }

      if (req.body.clientId) {
        updateData.clientId = new ObjectId(req.body.clientId)
      }

      const result = await db
        .collection("domains")
        .findOneAndUpdate(
          { _id: new ObjectId(req.params.id), workline: "hosting" },
          { $set: updateData },
          { returnDocument: "after" },
        )

      if (!result.value) {
        return res.status(404).json({ error: "Domain not found" })
      }

      res.json(result.value)
    } catch (error) {
      console.error("Error updating domain:", error)
      res.status(500).json({ error: "Failed to update domain" })
    }
  },
)

// DELETE /api/hosting/domains/:id - Delete domain
router.delete(
  "/:id",
  authenticateToken,
  requireRole(["admin"]),
  param("id").isMongoId(),
  validateRequest,
  async (req, res) => {
    try {
      const db = getDb()
      const result = await db.collection("domains").deleteOne({
        _id: new ObjectId(req.params.id),
        workline: "hosting",
      })

      if (result.deletedCount === 0) {
        return res.status(404).json({ error: "Domain not found" })
      }

      res.json({ message: "Domain deleted successfully" })
    } catch (error) {
      console.error("Error deleting domain:", error)
      res.status(500).json({ error: "Failed to delete domain" })
    }
  },
)

// GET /api/hosting/domains/expiring - Get domains expiring soon
router.get("/expiring", authenticateToken, async (req, res) => {
  try {
    const db = getDb()
    const { days = 30 } = req.query

    const expiryDate = new Date()
    expiryDate.setDate(expiryDate.getDate() + Number(days))

    const domains = await db
      .collection("domains")
      .aggregate([
        {
          $match: {
            workline: "hosting",
            expiryDate: { $lte: expiryDate },
            status: "active",
          },
        },
        {
          $lookup: {
            from: "clients",
            localField: "clientId",
            foreignField: "_id",
            as: "client",
          },
        },
        { $unwind: { path: "$client", preserveNullAndEmptyArrays: true } },
        { $sort: { expiryDate: 1 } },
      ])
      .toArray()

    res.json(domains)
  } catch (error) {
    console.error("Error fetching expiring domains:", error)
    res.status(500).json({ error: "Failed to fetch expiring domains" })
  }
})

export default router
