import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ValidationError } from "../utils/errors";

const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  username: z.string().min(3).max(100),
  password: z.string().min(8, "Password must be at least 8 characters"),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email().or(z.string()),
  password: z.string().min(1, "Password is required"),
});

const validateSchema = z.object({
  token: z.string().min(1, "Token is required"),
});

export const validateRegister = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    registerSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fields: Record<string, string[]> = {};
      error.errors.forEach((err) => {
        const path = err.path.join(".");
        if (!fields[path]) {
          fields[path] = [];
        }
        fields[path].push(err.message);
      });
      throw new ValidationError("Validation failed", fields);
    }
    next(error);
  }
};

export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    loginSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fields: Record<string, string[]> = {};
      error.errors.forEach((err) => {
        const path = err.path.join(".");
        if (!fields[path]) {
          fields[path] = [];
        }
        fields[path].push(err.message);
      });
      throw new ValidationError("Validation failed", fields);
    }
    next(error);
  }
};

export const validateValidate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    validateSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fields: Record<string, string[]> = {};
      error.errors.forEach((err) => {
        const path = err.path.join(".");
        if (!fields[path]) {
          fields[path] = [];
        }
        fields[path].push(err.message);
      });
      throw new ValidationError("Validation failed", fields);
    }
    next(error);
  }
};

