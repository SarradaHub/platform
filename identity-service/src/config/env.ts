import dotenv from "dotenv";

dotenv.config();

export const config = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: parseInt(process.env.PORT || "3001", 10),
  DATABASE_URL: process.env.DATABASE_URL || "postgresql://postgres:password@localhost:5435/platform_identity",
  DIRECT_URL: process.env.DIRECT_URL || process.env.DATABASE_URL || "postgresql://postgres:password@localhost:5435/platform_identity",
  JWT_SECRET: process.env.JWT_SECRET || "change-this-secret-key-in-production",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "24h",
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  BCRYPT_ROUNDS: parseInt(process.env.BCRYPT_ROUNDS || "12", 10),
  API_KEY_LENGTH: parseInt(process.env.API_KEY_LENGTH || "32", 10),
};

