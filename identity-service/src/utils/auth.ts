import jwt, { SignOptions } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { config } from "../config/env";
import crypto from "crypto";

export interface AuthPayload {
  userId: number;
  email: string;
  username: string;
  role: string;
}

export interface AuthToken {
  token: string;
  refreshToken?: string;
  expiresIn: string;
}

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, config.BCRYPT_ROUNDS);
};

export const comparePassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

export const generateToken = (payload: AuthPayload): AuthToken => {
  const options: SignOptions = {
    expiresIn: config.JWT_EXPIRES_IN as SignOptions["expiresIn"],
    issuer: "identity-service",
    audience: "sarradahub-services",
  };

  const token = jwt.sign(payload, config.JWT_SECRET, options);
  const refreshTokenOptions: SignOptions = {
    expiresIn: config.JWT_REFRESH_EXPIRES_IN as SignOptions["expiresIn"],
    issuer: "identity-service",
    audience: "sarradahub-services",
  };
  const refreshToken = jwt.sign(
    { userId: payload.userId },
    config.JWT_SECRET,
    refreshTokenOptions
  );

  return {
    token,
    refreshToken,
    expiresIn: config.JWT_EXPIRES_IN,
  };
};

export const verifyToken = (token: string): AuthPayload => {
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET, {
      issuer: "identity-service",
      audience: "sarradahub-services",
    }) as AuthPayload;

    return decoded;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};

export const extractTokenFromHeader = (
  authHeader: string | undefined
): string => {
  if (!authHeader) {
    throw new Error("Authorization header is required");
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    throw new Error(
      "Invalid authorization header format. Expected: Bearer <token>"
    );
  }

  return parts[1];
};

export const generateApiKey = (): string => {
  return `sk_${crypto.randomBytes(config.API_KEY_LENGTH).toString("hex")}`;
};

