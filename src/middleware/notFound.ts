import type { Request, Response } from "express"

export function notFound(req: Request, res: Response) {
  res.status(404).json({
    error: "Route not found",
    path: req.originalUrl,
    method: req.method,
  })
}
