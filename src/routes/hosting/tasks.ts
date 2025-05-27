import { Router } from "express"
import { connectToDatabase } from "../../config/database"
import { authenticate, authorize, requireWorkline, type AuthRequest } from "../../middleware/auth"
import { createError } from "../../middleware/errorHandler"
import { ObjectId } from "mongodb"

const router = Router()

// Apply hosting workline requirement to all routes
router.use(requireWorkline("hosting"))

// Get hosting tasks
router.get("/", authenticate, authorize("read"), async (req: AuthRequest, res, next) => {
  try {
    const page = Number.parseInt(req.query.page as string) || 1
    const limit = Number.parseInt(req.query.limit as string) || 10
    const status = (req.query.status as string) || ""
    const priority = (req.query.priority as string) || ""
    const assignedTo = (req.query.assignedTo as string) || ""
    const serviceType = (req.query.serviceType as string) || ""

    const db = await connectToDatabase()
    const tasks = db.collection("hosting_tasks")

    const filter: any = { workline: "hosting" }
    if (status && status !== "all") filter.status = status
    if (priority && priority !== "all") filter.priority = priority
    if (assignedTo) filter.assignedTo = new ObjectId(assignedTo)
    if (serviceType) filter.serviceType = serviceType

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
        const createdByUser = task.assignedBy
          ? await users.findOne({ _id: task.assignedBy }, { projection: { name: 1, email: 1 } })
          : null

        return {
          ...task,
          _id: task._id.toString(),
          assignedTo: assignedUser ? { ...assignedUser, _id: assignedUser._id.toString() } : null,
          assignedBy: createdByUser ? { ...createdByUser, _id: createdByUser._id.toString() } : null,
        }
      }),
    )

    res.json({
      tasks: populatedTasks,
      pagination: {
        page,
        limit,
        total: totalTasks,
        pages: Math.ceil(totalTasks / limit),
      },
    })
  } catch (error) {
    next(error)
  }
})

// Create hosting task
router.post("/", authenticate, authorize("manage_tasks"), async (req: AuthRequest, res, next) => {
  try {
    const {
      title,
      description,
      priority = "medium",
      assignedTo,
      dueDate,
      tags = [],
      serviceType,
      clientId,
      serverId,
      estimatedHours,
    } = req.body

    const db = await connectToDatabase()
    const tasks = db.collection("hosting_tasks")

    const newTask = {
      title,
      description,
      status: "pending",
      priority,
      assignedTo: assignedTo ? new ObjectId(assignedTo) : null,
      assignedBy: new ObjectId(req.user!.userId),
      dueDate: dueDate ? new Date(dueDate) : null,
      tags,
      workline: "hosting",
      serviceType,
      clientId: clientId ? new ObjectId(clientId) : null,
      serverId: serverId ? new ObjectId(serverId) : null,
      estimatedHours,
      actualHours: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await tasks.insertOne(newTask)

    res.status(201).json({
      message: "Hosting task created successfully",
      task: { ...newTask, _id: result.insertedId.toString() },
    })
  } catch (error) {
    next(error)
  }
})

// Update hosting task
router.put("/:id", authenticate, authorize("manage_tasks"), async (req: AuthRequest, res, next) => {
  try {
    const { id } = req.params
    const updates = req.body

    if (!ObjectId.isValid(id)) {
      throw createError("Invalid task ID", 400)
    }

    const db = await connectToDatabase()
    const tasks = db.collection("hosting_tasks")

    // Convert ObjectIds if provided
    if (updates.assignedTo) {
      updates.assignedTo = new ObjectId(updates.assignedTo)
    }
    if (updates.clientId) {
      updates.clientId = new ObjectId(updates.clientId)
    }
    if (updates.serverId) {
      updates.serverId = new ObjectId(updates.serverId)
    }
    if (updates.dueDate) {
      updates.dueDate = new Date(updates.dueDate)
    }

    const result = await tasks.updateOne({ _id: new ObjectId(id) }, { $set: { ...updates, updatedAt: new Date() } })

    if (result.matchedCount === 0) {
      throw createError("Task not found", 404)
    }

    const updatedTask = await tasks.findOne({ _id: new ObjectId(id) })

    res.json({
      message: "Hosting task updated successfully",
      task: { ...updatedTask, _id: updatedTask!._id.toString() },
    })
  } catch (error) {
    next(error)
  }
})

// Delete hosting task
router.delete("/:id", authenticate, authorize("manage_tasks"), async (req: AuthRequest, res, next) => {
  try {
    const { id } = req.params

    if (!ObjectId.isValid(id)) {
      throw createError("Invalid task ID", 400)
    }

    const db = await connectToDatabase()
    const tasks = db.collection("hosting_tasks")

    const result = await tasks.deleteOne({ _id: new ObjectId(id) })

    if (result.deletedCount === 0) {
      throw createError("Task not found", 404)
    }

    res.json({ message: "Hosting task deleted successfully" })
  } catch (error) {
    next(error)
  }
})

export default router
