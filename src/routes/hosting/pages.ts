import express from "express"
import { ObjectId } from "mongodb"
import { getDb } from "../../config/database"
import { authenticateToken, requireRole } from "../../middleware/auth"
import { validateRequest } from "../../middleware/validation"
import { body, param } from "express-validator"

const router = express.Router()

// Validation schemas
const createPageValidation = [
  body("title").notEmpty().withMessage("Page title is required"),
  body("slug").notEmpty().withMessage("Page slug is required"),
  body("content").notEmpty().withMessage("Page content is required"),
  body("status").isIn(["draft", "published", "archived"]).withMessage("Valid status is required"),
  body("type")
    .isIn(["landing", "service", "blog", "documentation", "support"])
    .withMessage("Valid page type is required"),
]

const updatePageValidation = [
  param("id").isMongoId().withMessage("Valid page ID is required"),
  body("title").optional().notEmpty().withMessage("Page title cannot be empty"),
  body("slug").optional().notEmpty().withMessage("Page slug cannot be empty"),
  body("status").optional().isIn(["draft", "published", "archived"]).withMessage("Valid status is required"),
]

// GET /api/hosting/pages - Get all hosting pages
router.get("/", authenticateToken, async (req, res) => {
  try {
    const db = getDb()
    const { page = 1, limit = 10, search, status, type } = req.query

    const filter: any = { workline: "hosting" }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
        { slug: { $regex: search, $options: "i" } },
      ]
    }

    if (status) filter.status = status
    if (type) filter.type = type

    const pages = await db
      .collection("pages")
      .find(filter)
      .sort({ createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .toArray()

    const total = await db.collection("pages").countDocuments(filter)

    res.json({
      pages,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    })
  } catch (error) {
    console.error("Error fetching hosting pages:", error)
    res.status(500).json({ error: "Failed to fetch pages" })
  }
})

// GET /api/hosting/pages/:id - Get specific page
router.get("/:id", authenticateToken, param("id").isMongoId(), validateRequest, async (req, res) => {
  try {
    const db = getDb()
    const page = await db.collection("pages").findOne({
      _id: new ObjectId(req.params.id),
      workline: "hosting",
    })

    if (!page) {
      return res.status(404).json({ error: "Page not found" })
    }

    res.json(page)
  } catch (error) {
    console.error("Error fetching page:", error)
    res.status(500).json({ error: "Failed to fetch page" })
  }
})

// POST /api/hosting/pages - Create new page
router.post(
  "/",
  authenticateToken,
  requireRole(["admin", "manager", "editor"]),
  createPageValidation,
  validateRequest,
  async (req, res) => {
    try {
      const db = getDb()

      // Check if slug already exists
      const existingPage = await db.collection("pages").findOne({
        slug: req.body.slug,
        workline: "hosting",
      })

      if (existingPage) {
        return res.status(400).json({ error: "Page with this slug already exists" })
      }

      const pageData = {
        ...req.body,
        workline: "hosting",
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: req.user.userId,
        views: 0,
        seoTitle: req.body.seoTitle || req.body.title,
        seoDescription: req.body.seoDescription || "",
        featured: false,
      }

      const result = await db.collection("pages").insertOne(pageData)
      const page = await db.collection("pages").findOne({ _id: result.insertedId })

      res.status(201).json(page)
    } catch (error) {
      console.error("Error creating page:", error)
      res.status(500).json({ error: "Failed to create page" })
    }
  },
)

// PUT /api/hosting/pages/:id - Update page
router.put(
  "/:id",
  authenticateToken,
  requireRole(["admin", "manager", "editor"]),
  updatePageValidation,
  validateRequest,
  async (req, res) => {
    try {
      const db = getDb()

      // Check if slug already exists (excluding current page)
      if (req.body.slug) {
        const existingPage = await db.collection("pages").findOne({
          slug: req.body.slug,
          workline: "hosting",
          _id: { $ne: new ObjectId(req.params.id) },
        })

        if (existingPage) {
          return res.status(400).json({ error: "Page with this slug already exists" })
        }
      }

      const updateData = {
        ...req.body,
        updatedAt: new Date(),
        updatedBy: req.user.userId,
      }

      const result = await db
        .collection("pages")
        .findOneAndUpdate(
          { _id: new ObjectId(req.params.id), workline: "hosting" },
          { $set: updateData },
          { returnDocument: "after" },
        )

      if (!result.value) {
        return res.status(404).json({ error: "Page not found" })
      }

      res.json(result.value)
    } catch (error) {
      console.error("Error updating page:", error)
      res.status(500).json({ error: "Failed to update page" })
    }
  },
)

// DELETE /api/hosting/pages/:id - Delete page
router.delete(
  "/:id",
  authenticateToken,
  requireRole(["admin"]),
  param("id").isMongoId(),
  validateRequest,
  async (req, res) => {
    try {
      const db = getDb()
      const result = await db.collection("pages").deleteOne({
        _id: new ObjectId(req.params.id),
        workline: "hosting",
      })

      if (result.deletedCount === 0) {
        return res.status(404).json({ error: "Page not found" })
      }

      res.json({ message: "Page deleted successfully" })
    } catch (error) {
      console.error("Error deleting page:", error)
      res.status(500).json({ error: "Failed to delete page" })
    }
  },
)

// POST /api/hosting/pages/:id/view - Increment page views
router.post("/:id/view", param("id").isMongoId(), validateRequest, async (req, res) => {
  try {
    const db = getDb()
    const result = await db
      .collection("pages")
      .findOneAndUpdate(
        { _id: new ObjectId(req.params.id), workline: "hosting" },
        { $inc: { views: 1 } },
        { returnDocument: "after" },
      )

    if (!result.value) {
      return res.status(404).json({ error: "Page not found" })
    }

    res.json({ views: result.value.views })
  } catch (error) {
    console.error("Error incrementing page views:", error)
    res.status(500).json({ error: "Failed to increment page views" })
  }
})

export default router
