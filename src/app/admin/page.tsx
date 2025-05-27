"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { analyticsAPI } from "@/lib/api"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Users, Shield, Server, AlertTriangle, CheckCircle, Globe, Activity, TrendingUp } from "lucide-react"

interface DashboardData {
  overview: {
    totalUsers: number
    activeUsers: number
    cyberUsers: number
    hostingUsers: number
  }
  cybersecurity: {
    tasks: { total: number; pending: number; completed: number }
    incidents: { total: number; open: number; resolved: number }
  }
  hosting: {
    tasks: { total: number; pending: number; completed: number }
    infrastructure: { servers: number; activeServers: number; domains: number }
  }
  recentActivity: {
    cyberTasks: any[]
    hostingTasks: any[]
    incidents: any[]
  }
}

export default function AdminDashboard() {
  const { user } = useAuth()
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedWorkline, setSelectedWorkline] = useState<"overview" | "cybersecurity" | "hosting">("overview")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await analyticsAPI.getDashboardAnalytics()
        setData(response)
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!data) {
    return <div className="text-center text-red-600">Failed to load dashboard data</div>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Multi-Service Dashboard</h1>
          <p className="text-gray-600">
            Welcome back, {user?.name}! Here's your unified overview of cybersecurity and hosting operations.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-sm">
            {user?.worklines?.join(" & ") || "No worklines"}
          </Badge>
          <Badge variant="secondary">{user?.role}</Badge>
        </div>
      </div>

      {/* Workline Selector */}
      <Tabs value={selectedWorkline} onValueChange={(value) => setSelectedWorkline(value as any)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="cybersecurity">Cybersecurity</TabsTrigger>
          <TabsTrigger value="hosting">Web Hosting</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.overview.totalUsers}</div>
                <p className="text-xs text-muted-foreground">{data.overview.activeUsers} active</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Cyber Team</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.overview.cyberUsers}</div>
                <p className="text-xs text-muted-foreground">cybersecurity specialists</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Hosting Team</CardTitle>
                <Server className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.overview.hostingUsers}</div>
                <p className="text-xs text-muted-foreground">hosting specialists</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Servers</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.hosting.infrastructure.activeServers}</div>
                <p className="text-xs text-muted-foreground">of {data.hosting.infrastructure.servers} total</p>
              </CardContent>
            </Card>
          </div>

          {/* Combined Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Cybersecurity Activity</CardTitle>
                <CardDescription>Latest tasks and incidents</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {data.recentActivity.cyberTasks.slice(0, 3).map((task) => (
                  <div key={task._id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{task.title}</p>
                      <p className="text-sm text-gray-500">{new Date(task.createdAt).toLocaleDateString()}</p>
                    </div>
                    <Badge variant={task.status === "completed" ? "default" : "secondary"}>{task.status}</Badge>
                  </div>
                ))}
                {data.recentActivity.incidents.slice(0, 2).map((incident) => (
                  <div key={incident._id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{incident.title}</p>
                      <p className="text-sm text-gray-500">Incident - {incident.severity}</p>
                    </div>
                    <Badge variant={incident.status === "resolved" ? "default" : "destructive"}>
                      {incident.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Hosting Activity</CardTitle>
                <CardDescription>Latest hosting tasks and updates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {data.recentActivity.hostingTasks.slice(0, 5).map((task) => (
                  <div key={task._id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{task.title}</p>
                      <p className="text-sm text-gray-500">{new Date(task.createdAt).toLocaleDateString()}</p>
                    </div>
                    <Badge variant={task.status === "completed" ? "default" : "secondary"}>{task.status}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Cybersecurity Tab */}
        <TabsContent value="cybersecurity" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.cybersecurity.tasks.total}</div>
                <p className="text-xs text-muted-foreground">{data.cybersecurity.tasks.pending} pending</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Open Incidents</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.cybersecurity.incidents.open}</div>
                <p className="text-xs text-muted-foreground">{data.cybersecurity.incidents.resolved} resolved</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round((data.cybersecurity.tasks.completed / data.cybersecurity.tasks.total) * 100)}%
                </div>
                <p className="text-xs text-muted-foreground">task completion</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Resolution Rate</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round((data.cybersecurity.incidents.resolved / data.cybersecurity.incidents.total) * 100)}%
                </div>
                <p className="text-xs text-muted-foreground">incident resolution</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Hosting Tab */}
        <TabsContent value="hosting" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.hosting.tasks.total}</div>
                <p className="text-xs text-muted-foreground">{data.hosting.tasks.pending} pending</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Servers</CardTitle>
                <Server className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.hosting.infrastructure.activeServers}</div>
                <p className="text-xs text-muted-foreground">of {data.hosting.infrastructure.servers} total</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Domains</CardTitle>
                <Globe className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.hosting.infrastructure.domains}</div>
                <p className="text-xs text-muted-foreground">managed domains</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round((data.hosting.tasks.completed / data.hosting.tasks.total) * 100)}%
                </div>
                <p className="text-xs text-muted-foreground">task completion</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
