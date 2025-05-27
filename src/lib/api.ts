import axios from "axios"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      localStorage.removeItem("workline")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

export interface User {
  _id: string
  email: string
  name: string
  role: "admin" | "moderator" | "user"
  permissions: string[]
  department: string
  worklines: ("cybersecurity" | "hosting")[]
  primaryWorkline?: "cybersecurity" | "hosting"
  isActive: boolean
  createdAt: string
  lastLogin?: string
}

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post("/auth/login", { email, password })
    return response.data
  },

  switchWorkline: async (workline: "cybersecurity" | "hosting") => {
    const response = await api.post("/auth/switch-workline", { workline })
    return response.data
  },

  verify: async () => {
    const response = await api.get("/auth/verify")
    return response.data
  },
}

// Cybersecurity API
export const cyberAPI = {
  getTasks: async (params?: any) => {
    const response = await api.get("/cybersecurity/tasks", { params })
    return response.data
  },

  createTask: async (taskData: any) => {
    const response = await api.post("/cybersecurity/tasks", taskData)
    return response.data
  },

  getIncidents: async (params?: any) => {
    const response = await api.get("/cybersecurity/incidents", { params })
    return response.data
  },

  createIncident: async (incidentData: any) => {
    const response = await api.post("/cybersecurity/incidents", incidentData)
    return response.data
  },

  getClients: async (params?: any) => {
    const response = await api.get("/cybersecurity/clients", { params })
    return response.data
  },

  getThreats: async (params?: any) => {
    const response = await api.get("/cybersecurity/threats", { params })
    return response.data
  },
}

// Hosting API
export const hostingAPI = {
  getTasks: async (params?: any) => {
    const response = await api.get("/hosting/tasks", { params })
    return response.data
  },

  createTask: async (taskData: any) => {
    const response = await api.post("/hosting/tasks", taskData)
    return response.data
  },

  getServers: async (params?: any) => {
    const response = await api.get("/hosting/servers", { params })
    return response.data
  },

  createServer: async (serverData: any) => {
    const response = await api.post("/hosting/servers", serverData)
    return response.data
  },

  getClients: async (params?: any) => {
    const response = await api.get("/hosting/clients", { params })
    return response.data
  },

  getDomains: async (params?: any) => {
    const response = await api.get("/hosting/domains", { params })
    return response.data
  },
}

// Analytics API
export const analyticsAPI = {
  getDashboardAnalytics: async () => {
    const response = await api.get("/analytics/dashboard")
    return response.data
  },

  getWorklineAnalytics: async (workline: "cybersecurity" | "hosting") => {
    const response = await api.get(`/analytics/workline/${workline}`)
    return response.data
  },
}

export default api
