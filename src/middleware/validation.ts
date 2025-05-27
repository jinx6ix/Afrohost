import type { Request, Response, NextFunction } from "express"
import Joi from "joi"

export function validate(schema: Joi.ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body)

    if (error) {
      return res.status(400).json({
        error: "Validation error",
        details: error.details.map((detail) => detail.message),
      })
    }

    next()
  }
}

export const schemas = {
  register: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().min(2).required(),
    role: Joi.string().valid("admin", "moderator", "user").default("user"),
    department: Joi.string().default("General"),
  }),

  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),

  createUser: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().min(2).required(),
    role: Joi.string().valid("admin", "moderator", "user").default("user"),
    department: Joi.string().default("General"),
  }),

  updateUser: Joi.object({
    email: Joi.string().email(),
    password: Joi.string().min(6),
    name: Joi.string().min(2),
    role: Joi.string().valid("admin", "moderator", "user"),
    department: Joi.string(),
    isActive: Joi.boolean(),
  }),

  createTask: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    priority: Joi.string().valid("low", "medium", "high", "urgent").default("medium"),
    assignedTo: Joi.string().optional(),
    dueDate: Joi.date().optional(),
    site: Joi.string().default("global"),
    tags: Joi.array().items(Joi.string()).default([]),
  }),

  updateTask: Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    status: Joi.string().valid("pending", "in-progress", "completed", "cancelled"),
    priority: Joi.string().valid("low", "medium", "high", "urgent"),
    assignedTo: Joi.string().allow(null),
    dueDate: Joi.date().allow(null),
    site: Joi.string(),
    tags: Joi.array().items(Joi.string()),
  }),

  createPage: Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    site: Joi.string().default("cybersecurity"),
    metaTitle: Joi.string().optional(),
    metaDescription: Joi.string().optional(),
    tags: Joi.array().items(Joi.string()).default([]),
  }),

  updatePage: Joi.object({
    title: Joi.string(),
    content: Joi.string(),
    status: Joi.string().valid("draft", "published", "archived"),
    site: Joi.string(),
    metaTitle: Joi.string(),
    metaDescription: Joi.string(),
    tags: Joi.array().items(Joi.string()),
  }),
}
