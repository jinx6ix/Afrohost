// WebSocket client for real-time data
export class WebSocketManager {
  private ws: WebSocket | null = null
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5
  private reconnectDelay = 1000

  constructor(private url: string) {}

  connect(onMessage: (data: any) => void, onError?: (error: Event) => void) {
    try {
      this.ws = new WebSocket(this.url)

      this.ws.onopen = () => {
        console.log("WebSocket connected")
        this.reconnectAttempts = 0
      }

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          onMessage(data)
        } catch (error) {
          console.error("Error parsing WebSocket message:", error)
        }
      }

      this.ws.onclose = () => {
        console.log("WebSocket disconnected")
        this.reconnect(onMessage, onError)
      }

      this.ws.onerror = (error) => {
        console.error("WebSocket error:", error)
        if (onError) onError(error)
      }
    } catch (error) {
      console.error("Error creating WebSocket:", error)
    }
  }

  private reconnect(onMessage: (data: any) => void, onError?: (error: Event) => void) {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++
      setTimeout(() => {
        console.log(`Reconnecting... Attempt ${this.reconnectAttempts}`)
        this.connect(onMessage, onError)
      }, this.reconnectDelay * this.reconnectAttempts)
    }
  }

  send(data: any) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data))
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }
  }
}

// Server-Sent Events client for real-time updates
export class SSEManager {
  private eventSource: EventSource | null = null

  connect(url: string, onMessage: (data: any) => void, onError?: (error: Event) => void) {
    this.eventSource = new EventSource(url)

    this.eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        onMessage(data)
      } catch (error) {
        console.error("Error parsing SSE message:", error)
      }
    }

    this.eventSource.onerror = (error) => {
      console.error("SSE error:", error)
      if (onError) onError(error)
    }
  }

  disconnect() {
    if (this.eventSource) {
      this.eventSource.close()
      this.eventSource = null
    }
  }
}
