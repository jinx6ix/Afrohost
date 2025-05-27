import { Router } from "express"
import { connectToDatabase } from "../config/database"
import { authenticate, authorize, type AuthRequest } from "../middleware/auth"
import { validate, schemas } from "../middleware/validation"
import { createError } from "../middleware/errorHandler"
import { ObjectId } from "mongodb"

const router = Router()

// Get tasks with pagination and filtering
router.get("/", authenticate, authorize("read"), async (req: AuthRequest, res, next) => {
  try {
    const page = Number.parseInt(req.query.page as string) || 1
    const limit = Number.parseInt(req.query.limit as string) || 10
    const status = (req.query.status as string) || ""
    const priority = (req.query.priority as string) || ""
    const site = (req.query.site as string) || ""
    const assignedTo = (req.query.assignedTo as string) || ""

    const db = await connectToDatabase()
    const tasks = db.collection("tasks")

    const filter: any = {}
    if (status && status !== "all") filter.status = status
    if (priority && priority !== "all") filter.priority = priority
    if (site && site !== "all") filter.site = site
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

// Create task
router.post(
  "/",
  authenticate,
  authorize("manage_tasks"),
  validate(schemas.createTask),
  async (req: AuthRequest, res, next) => {
    try {
      const { title, description, priority = "medium", assignedTo, dueDate, site = "global", tags = [] } = req.body

      const db = await connectToDatabase()
      const tasks = db.collection("tasks")

      const newTask = {
        title,
        description,
        status: "pending",
        priority,
        assignedTo: assignedTo ? new ObjectId(assignedTo) : null,
        assignedBy: new ObjectId(req.user!.userId),
        dueDate: dueDate ? new Date(dueDate) : null,
        site,
        tags,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      const result = await tasks.insertOne(newTask)

      res.status(201).json({
        message: "Task created successfully",
        task: { ...newTask, _id: result.insertedId.toString() },
      })
    } catch (error) {
      next(error)
    }
  },
)

// Update task
router.put(
  "/:id",
  authenticate,
  authorize("manage_tasks"),
  validate(schemas.updateTask),
  async (req: AuthRequest, res, next) => {
    try {
      const { id } = req.params
      const updates = req.body

      if (!ObjectId.isValid(id)) {
        throw createError("Invalid task ID", 400)
      }

      const db = await connectToDatabase()
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
        throw createError("Task not found", 404)
      }

      const updatedTask = await tasks.findOne({ _id: new ObjectId(id) })

      res.json({
        message: "Task updated successfully",
        task: { ...updatedTask, _id: updatedTask!._id.toString() },
      })
    } catch (error) {
      next(error)
    }
  },
)

// Delete task
router.delete("/:id", authenticate, authorize("manage_tasks"), async (req: AuthRequest, res, next) => {
  try {
    const { id } = req.params

    if (!ObjectId.isValid(id)) {
      throw createError("Invalid task ID", 400)
    }

    const db = await connectToDatabase()
    const tasks = db.collection("tasks")

    const result = await tasks.deleteOne({ _id: new ObjectId(id) })

    if (result.deletedCount === 0) {
      throw createError("Task not found", 404)
    }

    res.json({ message: "Task deleted successfully" })
  } catch (error) {
    next(error)
  }
})

// Get task by ID
router.get("/:id", authenticate, authorize("read"), async (req: AuthRequest, res, next) => {
  try {
    const { id } = req.params

    if (!ObjectId.isValid(id)) {
      throw createError("Invalid task ID", 400)
    }

    const db = await connectToDatabase()
    const tasks = db.collection("tasks")
    const users = db.collection("users")

    const task = await tasks.findOne({ _id: new ObjectId(id) })

    if (!task) {
      throw createError("Task not found", 404)
    }

    // Populate user information
    const assignedUser = task.assignedTo
      ? await users.findOne({ _id: task.assignedTo }, { projection: { name: 1, email: 1 } })
      : null
    const createdByUser = task.assignedBy
      ? await users.findOne({ _id: task.assignedBy }, { projection: { name: 1, email: 1 } })
      : null

    const populatedTask = {
      ...task,
      _id: task._id.toString(),
      assignedTo: assignedUser ? { ...assignedUser, _id: assignedUser._id.toString() } : null,
      assignedBy: createdByUser ? { ...createdByUser, _id: createdByUser._id.toString() } : null,
    }

    res.json({ task: populatedTask })
  } catch (error) {
    next(error)
  }
})

export default router
