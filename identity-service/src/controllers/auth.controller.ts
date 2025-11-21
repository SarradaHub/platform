import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/db";
import { hashPassword, comparePassword, generateToken, verifyToken, extractTokenFromHeader } from "../utils/auth";
import { UnauthorizedError, ConflictError, ValidationError } from "../utils/errors";
import { logger } from "../utils/logger";

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, username, password, firstName, lastName } = req.body;

      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [{ email }, { username }],
        },
      });

      if (existingUser) {
        throw new ConflictError("User with this email or username already exists");
      }

      const passwordHash = await hashPassword(password);

      const user = await prisma.user.create({
        data: {
          email,
          username,
          passwordHash,
          firstName,
          lastName,
        },
        select: {
          id: true,
          email: true,
          username: true,
          firstName: true,
          lastName: true,
          role: true,
          createdAt: true,
        },
      });

      const tokens = generateToken({
        userId: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      });

      res.status(201).json({
        success: true,
        data: {
          user,
          ...tokens,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const user = await prisma.user.findFirst({
        where: {
          OR: [{ email }, { username: email }],
        },
      });

      if (!user || !user.isActive) {
        throw new UnauthorizedError("Invalid credentials");
      }

      const isPasswordValid = await comparePassword(password, user.passwordHash);

      if (!isPasswordValid) {
        throw new UnauthorizedError("Invalid credentials");
      }

      const tokens = generateToken({
        userId: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      });

      const ipAddress = req.ip || req.socket.remoteAddress;
      const userAgent = req.get("user-agent");

      await prisma.session.create({
        data: {
          userId: user.id,
          token: tokens.token,
          refreshToken: tokens.refreshToken,
          ipAddress,
          userAgent,
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        },
      });

      res.json({
        success: true,
        data: {
          user: {
            id: user.id,
            email: user.email,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
          },
          ...tokens,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async validate(req: Request, res: Response, next: NextFunction) {
    try {
      const { token } = req.body;

      if (!token) {
        throw new ValidationError("Token is required");
      }

      const payload = verifyToken(token);

      const user = await prisma.user.findUnique({
        where: { id: payload.userId },
        select: {
          id: true,
          email: true,
          username: true,
          role: true,
          isActive: true,
        },
      });

      if (!user || !user.isActive) {
        throw new UnauthorizedError("User not found or inactive");
      }

      res.setHeader("X-User-Id", user.id.toString());
      res.setHeader("X-User-Email", user.email);
      res.setHeader("X-User-Role", user.role);

      res.json({
        success: true,
        data: {
          valid: true,
          user: {
            id: user.id,
            email: user.email,
            username: user.username,
            role: user.role,
          },
        },
      });
    } catch (error) {
      logger.warn("Token validation failed", { error: (error as Error).message });
      res.status(401).json({
        success: false,
        data: {
          valid: false,
        },
        message: "Invalid or expired token",
      });
    }
  }

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        throw new ValidationError("Refresh token is required");
      }

      const payload = verifyToken(refreshToken);

      const user = await prisma.user.findUnique({
        where: { id: payload.userId },
        select: {
          id: true,
          email: true,
          username: true,
          role: true,
          isActive: true,
        },
      });

      if (!user || !user.isActive) {
        throw new UnauthorizedError("User not found or inactive");
      }

      const tokens = generateToken({
        userId: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      });

      res.json({
        success: true,
        data: tokens,
      });
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers.authorization;
      if (authHeader) {
        const token = extractTokenFromHeader(authHeader);
        await prisma.session.deleteMany({
          where: { token },
        });
      }

      res.json({
        success: true,
        message: "Logged out successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

