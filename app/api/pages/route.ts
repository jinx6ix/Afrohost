import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "../components/lib/mongodb"
import { ObjectId } from "mongodb"
import { withAuth, AuthenticatedRequest } from '../components/lib/auth'
import { getPagesForUser } from '../components/lib/pages'  // Add this import


async function getPages(request: NextRequest & { user: any }) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const status = searchParams.get("status") || ""
    const site = searchParams.get("site") || ""
    const search = searchParams.get("search") || ""

    const db = await getDatabase()
    const pages = db.collection("pages")

    const filter: any = {}
    if (status) filter.status = status
    if (site) filter.site = site
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

    return NextResponse.json({
      pages: populatedPages,
      pagination: {
        page,
        limit,
        total: totalPages,
        pages: Math.ceil(totalPages / limit),
      },
    })
  } catch (error) {
    console.error("Get pages error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

async function createPage(request: NextRequest & { user: any }) {
  try {
    const pageData = await request.json()
    const { title, content, site = "cybersecurity", metaTitle, metaDescription, tags = [] } = pageData

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 })
    }

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")

    const db = await getDatabase()
    const pages = db.collection("pages")

    // Check if slug already exists
    const existingPage = await pages.findOne({ slug, site })
    if (existingPage) {
      return NextResponse.json({ error: "Page with this slug already exists" }, { status: 409 })
    }

    const newPage = {
      title,
      slug,
      content,
      status: "draft",
      site,
      author: new ObjectId(request.user.userId),
      metaTitle: metaTitle || title,
      metaDescription: metaDescription || "",
      tags,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await pages.insertOne(newPage)

    return NextResponse.json(
      {
        message: "Page created successfully",
        page: { ...newPage, _id: result.insertedId.toString() },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Create page error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Your handler should now expect AuthenticatedRequest
const handler = async (request: AuthenticatedRequest) => {
  // You can now access request.user safely
  const userId = request.user.userId
  
  // Your existing logic here
  const pages = await getPagesForUser(userId)
  
  return NextResponse.json({ 
    pages,
    pagination: { /* ... */ }
  })
}

export const GET = withAuth(handler)
