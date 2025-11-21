import { Request, Response, NextFunction } from "express";
import { extractTokenFromHeader, verifyToken } from "../utils/auth";
import { UnauthorizedError } from "../utils/errors";

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      userId: number;
      email: string;
      username: string;
      role: string;
    };
  }
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    const token = extractTokenFromHeader(authHeader);
    const payload = verifyToken(token);
    req.user = payload;
    next();
  } catch (error) {
    next(new UnauthorizedError("Invalid or expired token"));
  }
};

