"use client"

import { useState, useEffect } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog"
import { Badge } from "../components/ui/badge"
import { Textarea } from "../components/ui/textarea"
import { Calendar, Plus, Edit, Trash2, CheckCircle, Clock, AlertCircle, XCircle } from "lucide-react"
import React from "react"

interface Task {
  _id: string
  title: string
  description: string
  status: "pending" | "in-progress" | "completed" | "cancelled"
  priority: "low" | "medium" | "high" | "urgent"
  assignedTo: { _id: string; name: string; email: string } | null
  assignedBy: { _id: string; name: string; email: string } | null
  dueDate: string | null
  site: string
  tags: string[]
  createdAt: string
  updatedAt: string
}

interface User {
  _id: string
  name: string
  email: string
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedStatus, setSelectedStatus] = useState("")
  const [selectedPriority, setSelectedPriority] = useState("")
  const [selectedSite, setSelectedSite] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "medium",
    assignedTo: "",
    dueDate: "",
    site: "global",
    tags: "",
  })

  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
    overdue: 0,
  })

  useEffect(() => {
    fetchTasks()
    fetchUsers()
  }, [selectedStatus, selectedPriority, selectedSite])

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token")
      const params = new URLSearchParams()
      if (selectedStatus) params.append("status", selectedStatus)
      if (selectedPriority) params.append("priority", selectedPriority)
      if (selectedSite) params.append("site", selectedSite)

      const response = await fetch(`/api/tasks?${params}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setTasks(data.tasks)

        // Calculate stats
        const total = data.tasks.length
        const pending = data.tasks.filter((t: Task) => t.status === "pending").length
        const inProgress = data.tasks.filter((t: Task) => t.status === "in-progress").length
        const completed = data.tasks.filter((t: Task) => t.status === "completed").length
        const overdue = data.tasks.filter(
          (t: Task) => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== "completed",
        ).length

        setStats({ total, pending, inProgress, completed, overdue })
      }
    } catch (error) {
      console.error("Error fetching tasks:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch("/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setUsers(data.users)
      }
    } catch (error) {
      console.error("Error fetching users:", error)
    }
  }

  const handleCreateTask = async () => {
    try {
      const token = localStorage.getItem("token")
      const taskData = {
        ...newTask,
        tags: newTask.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag),
      }

      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(taskData),
      })

      if (response.ok) {
        setIsCreateDialogOpen(false)
        setNewTask({
          title: "",
          description: "",
          priority: "medium",
          assignedTo: "",
          dueDate: "",
          site: "global",
          tags: "",
        })
        fetchTasks()
      }
    } catch (error) {
      console.error("Error creating task:", error)
    }
  }

  const handleUpdateTask = async () => {
    if (!editingTask) return

    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`/api/tasks/${editingTask._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: editingTask.title,
          description: editingTask.description,
          status: editingTask.status,
          priority: editingTask.priority,
          assignedTo: editingTask.assignedTo?._id,
          dueDate: editingTask.dueDate,
          site: editingTask.site,
          tags: editingTask.tags,
        }),
      })

      if (response.ok) {
        setIsEditDialogOpen(false)
        setEditingTask(null)
        fetchTasks()
      }
    } catch (error) {
      console.error("Error updating task:", error)
    }
  }

  const handleDeleteTask = async (taskId: string) => {
    if (!confirm("Are you sure you want to delete this task?")) return

    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        fetchTasks()
      }
    } catch (error) {
      console.error("Error deleting task:", error)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />
      case "in-progress":
        return <AlertCircle className="w-4 h-4" />
      case "completed":
        return <CheckCircle className="w-4 h-4" />
      case "cancelled":
        return <XCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800"
      case "high":
        return "bg-orange-100 text-orange-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Task Management</h1>
          <p className="text-muted-foreground">Manage tasks and assignments</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
              <DialogDescription>Add a new task to the system</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={newTask.priority}
                    onValueChange={(value) => setNewTask({ ...newTask, priority: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="site">Site</Label>
                  <Select value={newTask.site} onValueChange={(value) => setNewTask({ ...newTask, site: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="global">Global</SelectItem>
                      <SelectItem value="cybersecurity">CyberShield</SelectItem>
                      <SelectItem value="hosting">HostPro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="assignedTo">Assign To</Label>
                  <Select
                    value={newTask.assignedTo}
                    onValueChange={(value) => setNewTask({ ...newTask, assignedTo: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select user" />
                    </SelectTrigger>
                    <SelectContent>
                      {users.map((user) => (
                        <SelectItem key={user._id} value={user._id}>
                          {user.name} ({user.email})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input
                    id="dueDate"
                    type="datetime-local"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  value={newTask.tags}
                  onChange={(e) => setNewTask({ ...newTask, tags: e.target.value })}
                  placeholder="bug, feature, urgent"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleCreateTask}>Create Task</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <AlertCircle className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.inProgress}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.overdue}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedPriority} onValueChange={setSelectedPriority}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedSite} onValueChange={setSelectedSite}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by site" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sites</SelectItem>
                <SelectItem value="global">Global</SelectItem>
                <SelectItem value="cybersecurity">CyberShield</SelectItem>
                <SelectItem value="hosting">HostPro</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tasks List */}
      <Card>
        <CardHeader>
          <CardTitle>Tasks</CardTitle>
          <CardDescription>Manage and track task progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tasks.map((task) => (
              <div key={task._id} className="flex items-start justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-medium">{task.title}</h3>
                    <Badge className={getStatusColor(task.status)}>
                      {getStatusIcon(task.status)}
                      <span className="ml-1">{task.status.replace("-", " ")}</span>
                    </Badge>
                    <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                    <Badge variant="outline">{task.site}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    {task.assignedTo && <span>Assigned to: {task.assignedTo.name}</span>}
                    {task.dueDate && <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>}
                    <span>Created: {new Date(task.createdAt).toLocaleDateString()}</span>
                  </div>
                  {task.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {task.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingTask(task)
                      setIsEditDialogOpen(true)
                    }}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDeleteTask(task._id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Edit Task Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogDescription>Update task information and status</DialogDescription>
          </DialogHeader>
          {editingTask && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-title">Title</Label>
                <Input
                  id="edit-title"
                  value={editingTask.title}
                  onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={editingTask.description}
                  onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-status">Status</Label>
                  <Select
                    value={editingTask.status}
                    onValueChange={(value) => setEditingTask({ ...editingTask, status: value as any })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="edit-priority">Priority</Label>
                  <Select
                    value={editingTask.priority}
                    onValueChange={(value) => setEditingTask({ ...editingTask, priority: value as any })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-assignedTo">Assign To</Label>
                  <Select
                    value={editingTask.assignedTo?._id || ""}
                    onValueChange={(value) => {
                      const user = users.find((u) => u._id === value)
                      setEditingTask({
                        ...editingTask,
                        assignedTo: user ? { _id: user._id, name: user.name, email: user.email } : null,
                      })
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select user" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Unassigned</SelectItem>
                      {users.map((user) => (
                        <SelectItem key={user._id} value={user._id}>
                          {user.name} ({user.email})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="edit-dueDate">Due Date</Label>
                  <Input
                    id="edit-dueDate"
                    type="datetime-local"
                    value={editingTask.dueDate ? new Date(editingTask.dueDate).toISOString().slice(0, 16) : ""}
                    onChange={(e) => setEditingTask({ ...editingTask, dueDate: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="edit-site">Site</Label>
                <Select
                  value={editingTask.site}
                  onValueChange={(value) => setEditingTask({ ...editingTask, site: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="global">Global</SelectItem>
                    <SelectItem value="cybersecurity">CyberShield</SelectItem>
                    <SelectItem value="hosting">HostPro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-tags">Tags (comma-separated)</Label>
                <Input
                  id="edit-tags"
                  value={editingTask.tags.join(", ")}
                  onChange={(e) =>
                    setEditingTask({
                      ...editingTask,
                      tags: e.target.value
                        .split(",")
                        .map((tag) => tag.trim())
                        .filter((tag) => tag),
                    })
                  }
                  placeholder="bug, feature, urgent"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={handleUpdateTask}>Update Task</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
