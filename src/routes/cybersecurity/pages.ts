import express from "express"
import { ObjectId } from "mongodb"
import { getDatabase } from "../../config/database"
import { authenticateToken, requireRole } from "../../middleware/auth"
import { validatePageData } from "../../middleware/validation"

const router = express.Router()

// Get all cybersecurity pages
router.get("/", authenticateToken, async (req, res) => {
  try {
    const db = getDatabase()
    const { page = 1, limit = 10, search, status, category } = req.query

    const filter: any = { workline: "cybersecurity" }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search as string, "i")] } },
      ]
    }

    if (status) filter.status = status
    if (category) filter.category = category

    const skip = (Number(page) - 1) * Number(limit)

    const pages = await db
      .collection("pages")
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .toArray()

    const total = await db.collection("pages").countDocuments(filter)

    res.json({
      pages,
      pagination: {
        current: Number(page),
        pages: Math.ceil(total / Number(limit)),
        total,
      },
    })
  } catch (error) {
    console.error("Error fetching cybersecurity pages:", error)
    res.status(500).json({ error: "Failed to fetch pages" })
  }
})

// Get single cybersecurity page
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const db = getDatabase()
    const page = await db.collection("pages").findOne({
      _id: new ObjectId(req.params.id),
      workline: "cybersecurity",
    })

    if (!page) {
      return res.status(404).json({ error: "Page not found" })
    }

    res.json(page)
  } catch (error) {
    console.error("Error fetching cybersecurity page:", error)
    res.status(500).json({ error: "Failed to fetch page" })
  }
})

// Create new cybersecurity page
router.post("/", authenticateToken, requireRole(["admin", "editor"]), validatePageData, async (req, res) => {
  try {
    const db = getDatabase()
    const pageData = {
      ...req.body,
      workline: "cybersecurity",
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: req.user.id,
      views: 0,
      status: req.body.status || "draft",
    }

    const result = await db.collection("pages").insertOne(pageData)
    const newPage = await db.collection("pages").findOne({ _id: result.insertedId })

    res.status(201).json(newPage)
  } catch (error) {
    console.error("Error creating cybersecurity page:", error)
    res.status(500).json({ error: "Failed to create page" })
  }
})

// Update cybersecurity page
router.put("/:id", authenticateToken, requireRole(["admin", "editor"]), validatePageData, async (req, res) => {
  try {
    const db = getDatabase()
    const updateData = {
      ...req.body,
      updatedAt: new Date(),
      updatedBy: req.user.id,
    }

    const result = await db.collection("pages").findOneAndUpdate(
      {
        _id: new ObjectId(req.params.id),
        workline: "cybersecurity",
      },
      { $set: updateData },
      { returnDocument: "after" },
    )

    if (!result.value) {
      return res.status(404).json({ error: "Page not found" })
    }

    res.json(result.value)
  } catch (error) {
    console.error("Error updating cybersecurity page:", error)
    res.status(500).json({ error: "Failed to update page" })
  }
})

// Delete cybersecurity page
router.delete("/:id", authenticateToken, requireRole(["admin"]), async (req, res) => {
  try {
    const db = getDatabase()
    const result = await db.collection("pages").findOneAndDelete({
      _id: new ObjectId(req.params.id),
      workline: "cybersecurity",
    })

    if (!result.value) {
      return res.status(404).json({ error: "Page not found" })
    }

    res.json({ message: "Page deleted successfully" })
  } catch (error) {
    console.error("Error deleting cybersecurity page:", error)
    res.status(500).json({ error: "Failed to delete page" })
  }
})

// Publish/unpublish cybersecurity page
router.patch("/:id/status", authenticateToken, requireRole(["admin", "editor"]), async (req, res) => {
  try {
    const db = getDatabase()
    const { status } = req.body

    if (!["draft", "published", "archived"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" })
    }

    const result = await db.collection("pages").findOneAndUpdate(
      {
        _id: new ObjectId(req.params.id),
        workline: "cybersecurity",
      },
      {
        $set: {
          status,
          updatedAt: new Date(),
          updatedBy: req.user.id,
          ...(status === "published" && { publishedAt: new Date() }),
        },
      },
      { returnDocument: "after" },
    )

    if (!result.value) {
      return res.status(404).json({ error: "Page not found" })
    }

    res.json(result.value)
  } catch (error) {
    console.error("Error updating page status:", error)
    res.status(500).json({ error: "Failed to update page status" })
  }
})

// Increment page views
router.post("/:id/view", async (req, res) => {
  try {
    const db = getDatabase()
    await db.collection("pages").updateOne(
      {
        _id: new ObjectId(req.params.id),
        workline: "cybersecurity",
      },
      { $inc: { views: 1 } },
    )

    res.json({ message: "View count updated" })
  } catch (error) {
    console.error("Error updating view count:", error)
    res.status(500).json({ error: "Failed to update view count" })
  }
})

// Get cybersecurity page analytics
router.get("/:id/analytics", authenticateToken, requireRole(["admin", "editor"]), async (req, res) => {
  try {
    const db = getDatabase()
    const page = await db.collection("pages").findOne({
      _id: new ObjectId(req.params.id),
      workline: "cybersecurity",
    })

    if (!page) {
      return res.status(404).json({ error: "Page not found" })
    }

    // Get page analytics data
    const analytics = {
      views: page.views || 0,
      createdAt: page.createdAt,
      publishedAt: page.publishedAt,
      lastUpdated: page.updatedAt,
      status: page.status,
      category: page.category,
      tags: page.tags || [],
      wordCount: page.content ? page.content.split(" ").length : 0,
    }

    res.json(analytics)
  } catch (error) {
    console.error("Error fetching page analytics:", error)
    res.status(500).json({ error: "Failed to fetch analytics" })
  }
})

export default router
