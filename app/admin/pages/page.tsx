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
import { Search, Plus, Edit, Trash2, FileText, Globe, Archive } from "lucide-react"
import React from "react"

interface Page {
  _id: string
  title: string
  slug: string
  content: string
  status: "draft" | "published" | "archived"
  site: string
  author: { _id: string; name: string; email: string } | null
  metaTitle: string
  metaDescription: string
  tags: string[]
  createdAt: string
  updatedAt: string
  publishedAt?: string
}

export default function PagesPage() {
  const [pages, setPages] = useState<Page[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("")
  const [selectedSite, setSelectedSite] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingPage, setEditingPage] = useState<Page | null>(null)
  const [newPage, setNewPage] = useState({
    title: "",
    content: "",
    site: "cybersecurity",
    metaTitle: "",
    metaDescription: "",
    tags: "",
  })

  const [stats, setStats] = useState({
    total: 0,
    draft: 0,
    published: 0,
    archived: 0,
  })

  useEffect(() => {
    fetchPages()
  }, [searchTerm, selectedStatus, selectedSite])

  const fetchPages = async () => {
    try {
      const token = localStorage.getItem("token")
      const params = new URLSearchParams()
      if (searchTerm) params.append("search", searchTerm)
      if (selectedStatus) params.append("status", selectedStatus)
      if (selectedSite) params.append("site", selectedSite)

      const response = await fetch(`/api/pages?${params}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setPages(data.pages)

        // Calculate stats
        const total = data.pages.length
        const draft = data.pages.filter((p: Page) => p.status === "draft").length
        const published = data.pages.filter((p: Page) => p.status === "published").length
        const archived = data.pages.filter((p: Page) => p.status === "archived").length

        setStats({ total, draft, published, archived })
      }
    } catch (error) {
      console.error("Error fetching pages:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreatePage = async () => {
    try {
      const token = localStorage.getItem("token")
      const pageData = {
        ...newPage,
        tags: newPage.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag),
      }

      const response = await fetch("/api/pages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(pageData),
      })

      if (response.ok) {
        setIsCreateDialogOpen(false)
        setNewPage({
          title: "",
          content: "",
          site: "cybersecurity",
          metaTitle: "",
          metaDescription: "",
          tags: "",
        })
        fetchPages()
      }
    } catch (error) {
      console.error("Error creating page:", error)
    }
  }

  const handleUpdatePage = async () => {
    if (!editingPage) return

    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`/api/pages/${editingPage._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: editingPage.title,
          content: editingPage.content,
          status: editingPage.status,
          site: editingPage.site,
          metaTitle: editingPage.metaTitle,
          metaDescription: editingPage.metaDescription,
          tags: editingPage.tags,
        }),
      })

      if (response.ok) {
        setIsEditDialogOpen(false)
        setEditingPage(null)
        fetchPages()
      }
    } catch (error) {
      console.error("Error updating page:", error)
    }
  }

  const handleDeletePage = async (pageId: string) => {
    if (!confirm("Are you sure you want to delete this page?")) return

    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`/api/pages/${pageId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        fetchPages()
      }
    } catch (error) {
      console.error("Error deleting page:", error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-yellow-100 text-yellow-800"
      case "published":
        return "bg-green-100 text-green-800"
      case "archived":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "draft":
        return <Edit className="w-4 h-4" />
      case "published":
        return <Globe className="w-4 h-4" />
      case "archived":
        return <Archive className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Page Management</h1>
          <p className="text-muted-foreground">Create and manage website pages</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Page
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Page</DialogTitle>
              <DialogDescription>Add a new page to the website</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={newPage.title}
                    onChange={(e) => setNewPage({ ...newPage, title: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="site">Site</Label>
                  <Select value={newPage.site} onValueChange={(value) => setNewPage({ ...newPage, site: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cybersecurity">CyberShield</SelectItem>
                      <SelectItem value="hosting">HostPro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={newPage.content}
                  onChange={(e) => setNewPage({ ...newPage, content: e.target.value })}
                  rows={10}
                  placeholder="Enter page content here..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="metaTitle">Meta Title</Label>
                  <Input
                    id="metaTitle"
                    value={newPage.metaTitle}
                    onChange={(e) => setNewPage({ ...newPage, metaTitle: e.target.value })}
                    placeholder="SEO title"
                  />
                </div>
                <div>
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    value={newPage.tags}
                    onChange={(e) => setNewPage({ ...newPage, tags: e.target.value })}
                    placeholder="security, guide, tutorial"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="metaDescription">Meta Description</Label>
                <Textarea
                  id="metaDescription"
                  value={newPage.metaDescription}
                  onChange={(e) => setNewPage({ ...newPage, metaDescription: e.target.value })}
                  rows={3}
                  placeholder="SEO description"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleCreatePage}>Create Page</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pages</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Draft</CardTitle>
            <Edit className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.draft}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
            <Globe className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.published}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Archived</CardTitle>
            <Archive className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">{stats.archived}</div>
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
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search pages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedSite} onValueChange={setSelectedSite}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by site" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sites</SelectItem>
                <SelectItem value="cybersecurity">CyberShield</SelectItem>
                <SelectItem value="hosting">HostPro</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Pages List */}
      <Card>
        <CardHeader>
          <CardTitle>Pages</CardTitle>
          <CardDescription>Manage website pages and content</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pages.map((page) => (
              <div key={page._id} className="flex items-start justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-medium">{page.title}</h3>
                    <Badge className={getStatusColor(page.status)}>
                      {getStatusIcon(page.status)}
                      <span className="ml-1">{page.status}</span>
                    </Badge>
                    <Badge variant="outline">{page.site}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">/{page.slug}</p>
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{page.content.substring(0, 150)}...</p>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    {page.author && <span>Author: {page.author.name}</span>}
                    <span>Created: {new Date(page.createdAt).toLocaleDateString()}</span>
                    <span>Updated: {new Date(page.updatedAt).toLocaleDateString()}</span>
                    {page.publishedAt && <span>Published: {new Date(page.publishedAt).toLocaleDateString()}</span>}
                  </div>
                  {page.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {page.tags.map((tag, index) => (
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
                      setEditingPage(page)
                      setIsEditDialogOpen(true)
                    }}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDeletePage(page._id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Edit Page Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Page</DialogTitle>
            <DialogDescription>Update page content and settings</DialogDescription>
          </DialogHeader>
          {editingPage && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-title">Title</Label>
                  <Input
                    id="edit-title"
                    value={editingPage.title}
                    onChange={(e) => setEditingPage({ ...editingPage, title: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-status">Status</Label>
                  <Select
                    value={editingPage.status}
                    onValueChange={(value) => setEditingPage({ ...editingPage, status: value as any })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="edit-content">Content</Label>
                <Textarea
                  id="edit-content"
                  value={editingPage.content}
                  onChange={(e) => setEditingPage({ ...editingPage, content: e.target.value })}
                  rows={10}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-metaTitle">Meta Title</Label>
                  <Input
                    id="edit-metaTitle"
                    value={editingPage.metaTitle}
                    onChange={(e) => setEditingPage({ ...editingPage, metaTitle: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-site">Site</Label>
                  <Select
                    value={editingPage.site}
                    onValueChange={(value) => setEditingPage({ ...editingPage, site: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cybersecurity">CyberShield</SelectItem>
                      <SelectItem value="hosting">HostPro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="edit-metaDescription">Meta Description</Label>
                <Textarea
                  id="edit-metaDescription"
                  value={editingPage.metaDescription}
                  onChange={(e) => setEditingPage({ ...editingPage, metaDescription: e.target.value })}
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="edit-tags">Tags (comma-separated)</Label>
                <Input
                  id="edit-tags"
                  value={editingPage.tags.join(", ")}
                  onChange={(e) =>
                    setEditingPage({
                      ...editingPage,
                      tags: e.target.value
                        .split(",")
                        .map((tag) => tag.trim())
                        .filter((tag) => tag),
                    })
                  }
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={handleUpdatePage}>Update Page</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
