import { Router } from "express"
import { connectToDatabase } from "../config/database"
import { authenticate, authorize, type AuthRequest } from "../middleware/auth"
import { validate, schemas } from "../middleware/validation"
import { createError } from "../middleware/errorHandler"
import { ObjectId } from "mongodb"

const router = Router()

// Get pages with pagination and filtering
router.get("/", authenticate, authorize("read"), async (req: AuthRequest, res, next) => {
  try {
    const page = Number.parseInt(req.query.page as string) || 1
    const limit = Number.parseInt(req.query.limit as string) || 10
    const status = (req.query.status as string) || ""
    const site = (req.query.site as string) || ""
    const search = (req.query.search as string) || ""

    const db = await connectToDatabase()
    const pages = db.collection("pages")

    const filter: any = {}
    if (status && status !== "all") filter.status = status
    if (site && site !== "all") filter.site = site
    if (search) {
      filter.$or = [{ title: { $regex: search, $options: "i" } }, { content: { $regex: search, $options: "i" } }]
    }

    const skip = (page - 1) * limit
    const totalPages = await pages.countDocuments(filter)
    const pageList = await pages.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 }).toArray()

    // Populate author information
    const users = db.collection("users")
    const populatedPages = await Promise.all(
      pageList.map(async (page) => {
        const author = page.author
          ? await users.findOne({ _id: page.author }, { projection: { name: 1, email: 1 } })
          : null

        return {
          ...page,
          _id: page._id.toString(),
          author: author ? { ...author, _id: author._id.toString() } : null,
        }
      }),
    )

    res.json({
      pages: populatedPages,
      pagination: {
        page,
        limit,
        total: totalPages,
        pages: Math.ceil(totalPages / limit),
      },
    })
  } catch (error) {
    next(error)
  }
})

// Create page
router.post(
  "/",
  authenticate,
  authorize("manage_pages"),
  validate(schemas.createPage),
  async (req: AuthRequest, res, next) => {
    try {
      const { title, content, site = "cybersecurity", metaTitle, metaDescription, tags = [] } = req.body

      // Generate slug from title
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")

      const db = await connectToDatabase()
      const pages = db.collection("pages")

      // Check if slug already exists
      const existingPage = await pages.findOne({ slug, site })
      if (existingPage) {
        throw createError("Page with this slug already exists", 409)
      }

      const newPage = {
        title,
        slug,
        content,
        status: "draft",
        site,
        author: new ObjectId(req.user!.userId),
        metaTitle: metaTitle || title,
        metaDescription: metaDescription || "",
        tags,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      const result = await pages.insertOne(newPage)

      res.status(201).json({
        message: "Page created successfully",
        page: { ...newPage, _id: result.insertedId.toString() },
      })
    } catch (error) {
      next(error)
    }
  },
)

// Update page
router.put(
  "/:id",
  authenticate,
  authorize("manage_pages"),
  validate(schemas.updatePage),
  async (req: AuthRequest, res, next) => {
    try {
      const { id } = req.params
      const updates = req.body

      if (!ObjectId.isValid(id)) {
        throw createError("Invalid page ID", 400)
      }

      const db = await connectToDatabase()
      const pages = db.collection("pages")

      // If title is being updated, regenerate slug
      if (updates.title) {
        const slug = updates.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")
        updates.slug = slug
      }

      // If status is being changed to published, set publishedAt
      if (updates.status === "published") {
        updates.publishedAt = new Date()
      }

      const result = await pages.updateOne({ _id: new ObjectId(id) }, { $set: { ...updates, updatedAt: new Date() } })

      if (result.matchedCount === 0) {
        throw createError("Page not found", 404)
      }

      const updatedPage = await pages.findOne({ _id: new ObjectId(id) })

      res.json({
        message: "Page updated successfully",
        page: { ...updatedPage, _id: updatedPage!._id.toString() },
      })
    } catch (error) {
      next(error)
    }
  },
)

// Delete page
router.delete("/:id", authenticate, authorize("manage_pages"), async (req: AuthRequest, res, next) => {
  try {
    const { id } = req.params

    if (!ObjectId.isValid(id)) {
      throw createError("Invalid page ID", 400)
    }

    const db = await connectToDatabase()
    const pages = db.collection("pages")

    const result = await pages.deleteOne({ _id: new ObjectId(id) })

    if (result.deletedCount === 0) {
      throw createError("Page not found", 404)
    }

    res.json({ message: "Page deleted successfully" })
  } catch (error) {
    next(error)
  }
})

// Get page by ID
router.get("/:id", authenticate, authorize("read"), async (req: AuthRequest, res, next) => {
  try {
    const { id } = req.params

    if (!ObjectId.isValid(id)) {
      throw createError("Invalid page ID", 400)
    }

    const db = await connectToDatabase()
    const pages = db.collection("pages")
    const users = db.collection("users")

    const page = await pages.findOne({ _id: new ObjectId(id) })

    if (!page) {
      throw createError("Page not found", 404)
    }

    // Populate author information
    const author = page.author ? await users.findOne({ _id: page.author }, { projection: { name: 1, email: 1 } }) : null

    const populatedPage = {
      ...page,
      _id: page._id.toString(),
      author: author ? { ...author, _id: author._id.toString() } : null,
    }

    res.json({ page: populatedPage })
  } catch (error) {
    next(error)
  }
})

// Get page by slug (public endpoint)
router.get("/public/:site/:slug", async (req, res, next) => {
  try {
    const { site, slug } = req.params

    const db = await connectToDatabase()
    const pages = db.collection("pages")

    const page = await pages.findOne(
      {
        slug,
        site,
        status: "published",
      },
      {
        projection: {
          title: 1,
          content: 1,
          metaTitle: 1,
          metaDescription: 1,
          tags: 1,
          publishedAt: 1,
        },
      },
    )

    if (!page) {
      throw createError("Page not found", 404)
    }

    res.json({
      page: { ...page, _id: page._id.toString() },
    })
  } catch (error) {
    next(error)
  }
})

export default router
