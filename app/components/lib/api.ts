// API client for backend communication
export class APIClient {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  async get(endpoint: string) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    return response.json()
  }

  async post(endpoint: string, data: any) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    return response.json()
  }

  async put(endpoint: string, data: any) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    return response.json()
  }

  async delete(endpoint: string) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
    return response.json()
  }
}

// Multi-site API manager
export class MultiSiteAPI {
  private cybersecurityAPI: APIClient
  private hostingAPI: APIClient
  private adminAPI: APIClient

  constructor() {
    this.cybersecurityAPI = new APIClient("/api/cybersecurity")
    this.hostingAPI = new APIClient("/api/hosting")
    this.adminAPI = new APIClient("/api/admin")
  }

  // Cybersecurity API methods
  async getCyberSecurityMetrics() {
    return this.cybersecurityAPI.get("/metrics")
  }

  async getSecurityAlerts() {
    return this.cybersecurityAPI.get("/alerts")
  }

  async getThreatData() {
    return this.cybersecurityAPI.get("/threats")
  }

  // Hosting API methods
  async getHostingMetrics() {
    return this.hostingAPI.get("/metrics")
  }

  async getServerStatus() {
    return this.hostingAPI.get("/servers")
  }

  async getCustomerData() {
    return this.hostingAPI.get("/customers")
  }

  // Admin API methods
  async getGlobalMetrics() {
    return this.adminAPI.get("/metrics/global")
  }

  async getSiteStatus() {
    return this.adminAPI.get("/sites/status")
  }

  async getRecentActivity() {
    return this.adminAPI.get("/activity/recent")
  }

  async updateSiteConfig(siteId: string, config: any) {
    return this.adminAPI.put(`/sites/${siteId}/config`, config)
  }
}
