import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "../lib/mongodb"
import { withAuth } from "../lib/auth"
import { ObjectId } from "mongodb"

async function updatePage(request: NextRequest & { user: any }, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const updates = await request.json()

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid page ID" }, { status: 400 })
    }

    const db = await getDatabase()
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

    const result = await pages.updateOne(
      { _id: new ObjectId(id) }, 
      { $set: { ...updates, updatedAt: new Date() } }
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 })
    }

    const updatedPage = await pages.findOne({ _id: new ObjectId(id) })

    return NextResponse.json({
      message: "Page updated successfully",
      page: { 
        ...updatedPage, 
        _id: updatedPage!._id.toString() 
      },
    })
  } catch (error) {
    console.error("Update page error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

async function deletePage(request: NextRequest & { user: any }, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid page ID" }, { status: 400 })
    }

    const db = await getDatabase()
    const pages = db.collection("pages")

    const result = await pages.deleteOne({ _id: new ObjectId(id) })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Page deleted successfully" })
  } catch (error) {
    console.error("Delete page error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export const PUT = withAuth(updatePage, { requiredPermission: "manage_pages" })
export const DELETE = withAuth(deletePage, { requiredPermission: "manage_pages" })