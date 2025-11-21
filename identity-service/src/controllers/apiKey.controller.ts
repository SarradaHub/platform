import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/db";
import { generateApiKey } from "../utils/auth";
import { NotFoundError, ForbiddenError } from "../utils/errors";

export class ApiKeyController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        throw new ForbiddenError("Not authenticated");
      }

      const { name, description, scopes, expiresAt } = req.body;
      const key = generateApiKey();

      const apiKey = await prisma.apiKey.create({
        data: {
          userId: req.user.userId,
          key,
          name,
          description,
          scopes: scopes || [],
          expiresAt: expiresAt ? new Date(expiresAt) : null,
        },
      });

      res.status(201).json({
        success: true,
        data: {
          id: apiKey.id,
          key,
          name: apiKey.name,
          description: apiKey.description,
          scopes: apiKey.scopes,
          expiresAt: apiKey.expiresAt,
          createdAt: apiKey.createdAt,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        throw new ForbiddenError("Not authenticated");
      }

      const apiKeys = await prisma.apiKey.findMany({
        where: { userId: req.user.userId },
        select: {
          id: true,
          name: true,
          description: true,
          scopes: true,
          isActive: true,
          expiresAt: true,
          lastUsedAt: true,
          createdAt: true,
        },
        orderBy: { createdAt: "desc" },
      });

      res.json({
        success: true,
        data: apiKeys,
      });
    } catch (error) {
      next(error);
    }
  }

  async revoke(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        throw new ForbiddenError("Not authenticated");
      }

      const { id } = req.params;
      const keyId = parseInt(id, 10);

      const apiKey = await prisma.apiKey.findUnique({
        where: { id: keyId },
      });

      if (!apiKey) {
        throw new NotFoundError("API key not found");
      }

      if (apiKey.userId !== req.user.userId && req.user.role !== "admin") {
        throw new ForbiddenError("Access denied");
      }

      await prisma.apiKey.update({
        where: { id: keyId },
        data: { isActive: false },
      });

      res.json({
        success: true,
        message: "API key revoked successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

