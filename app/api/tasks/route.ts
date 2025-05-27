import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "../components/lib/mongodb"
import { withAuth } from "../components/lib/auth"
import { ObjectId } from "mongodb"

async function getTasks(request: NextRequest & { user: any }) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const status = searchParams.get("status") || ""
    const priority = searchParams.get("priority") || ""
    const site = searchParams.get("site") || ""
    const assignedTo = searchParams.get("assignedTo") || ""

    const db = await getDatabase()
    const tasks = db.collection("tasks")

    const filter: any = {}
    if (status) filter.status = status
    if (priority) filter.priority = priority
    if (site) filter.site = site
    if (assignedTo) filter.assignedTo = new ObjectId(assignedTo)

    const skip = (page - 1) * limit
    const totalTasks = await tasks.countDocuments(filter)
    const taskList = await tasks.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 }).toArray()

    // Populate user information
    const users = db.collection("users")
    const populatedTasks = await Promise.all(
      taskList.map(async (task) => {
        const assignedUser = task.assignedTo
          ? await users.findOne({ _id: task.assignedTo }, { projection: { name: 1, email: 1 } })
          : null
        const createdByUser = await users.findOne(
          { _id: task.assignedBy },
          { projection: { name: 1, email: 1 } }
        )

        return {
          ...task,
          _id: task._id.toString(),
          assignedTo: assignedUser ? { 
            ...assignedUser, 
            _id: assignedUser._id.toString() 
          } : null,
          assignedBy: {
            ...createdByUser,
            _id: createdByUser?._id.toString()
          }
        }
      })
    )

    return NextResponse.json({
      tasks: populatedTasks,
      pagination: {
        page,
        limit,
        total: totalTasks,
        pages: Math.ceil(totalTasks / limit),
      },
    })
  } catch (error) {
    console.error("Get tasks error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

async function createTask(request: NextRequest & { user: any }) {
  try {
    const taskData = await request.json()
    const { title, description, priority = "medium", assignedTo, dueDate, site = "global", tags = [] } = taskData

    if (!title || !description) {
      return NextResponse.json({ error: "Title and description are required" }, { status: 400 })
    }

    const db = await getDatabase()
    const tasks = db.collection("tasks")

    const newTask = {
      title,
      description,
      status: "pending",
      priority,
      assignedTo: assignedTo ? new ObjectId(assignedTo) : null,
      assignedBy: new ObjectId(request.user.userId),
      dueDate: dueDate ? new Date(dueDate) : null,
      site,
      tags,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await tasks.insertOne(newTask)

    return NextResponse.json(
      {
        message: "Task created successfully",
        task: { 
          ...newTask, 
          _id: result.insertedId.toString(),
          assignedTo: assignedTo ? assignedTo : null,
          assignedBy: request.user.userId
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Create task error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Corrected withAuth usage with options object
export const GET = withAuth(getTasks, { requiredPermission: "read" })
export const POST = withAuth(createTask, { requiredPermission: "manage_tasks" })
