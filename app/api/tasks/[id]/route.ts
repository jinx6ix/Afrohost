import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"
import { withAuth } from "@/lib/auth"
import { ObjectId } from "mongodb"

async function updateTask(request: NextRequest & { user: any }, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const updates = await request.json()

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid task ID" }, { status: 400 })
    }

    const db = await getDatabase()
    const tasks = db.collection("tasks")

    // Convert assignedTo to ObjectId if provided
    if (updates.assignedTo) {
      updates.assignedTo = new ObjectId(updates.assignedTo)
    }

    // Convert dueDate to Date if provided
    if (updates.dueDate) {
      updates.dueDate = new Date(updates.dueDate)
    }

    const result = await tasks.updateOne({ _id: new ObjectId(id) }, { $set: { ...updates, updatedAt: new Date() } })

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 })
    }

    const updatedTask = await tasks.findOne({ _id: new ObjectId(id) })

    return NextResponse.json({
      message: "Task updated successfully",
      task: { ...updatedTask, _id: updatedTask!._id.toString() },
    })
  } catch (error) {
    console.error("Update task error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

async function deleteTask(request: NextRequest & { user: any }, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid task ID" }, { status: 400 })
    }

    const db = await getDatabase()
    const tasks = db.collection("tasks")

    const result = await tasks.deleteOne({ _id: new ObjectId(id) })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Task deleted successfully" })
  } catch (error) {
    console.error("Delete task error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export const PUT = withAuth(updateTask, "manage_tasks")
export const DELETE = withAuth(deleteTask, "manage_tasks")
