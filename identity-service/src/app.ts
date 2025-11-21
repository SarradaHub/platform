import express from "express";
import morgan from "morgan";
import { config } from "./config/env";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";
import { securityHeaders, corsOptions, createRateLimit } from "./middleware/security";
import router from "./routes";
import { logger } from "./utils/logger";

export const app = express();

app.use(securityHeaders);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(corsOptions);

if (config.NODE_ENV !== "test") {
  app.use(morgan(config.NODE_ENV === "development" ? "dev" : "combined"));
}

app.use(
  createRateLimit({
    windowMs: 15 * 60 * 1000,
    max: config.NODE_ENV === "development" ? 1000 : 100,
  })
);

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "identity-service",
    timestamp: new Date().toISOString(),
    environment: config.NODE_ENV,
  });
});

app.get("/ready", async (req, res) => {
  try {
    const { prisma } = await import("./config/db");
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({
      status: "ready",
      service: "identity-service",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(503).json({
      status: "not ready",
      service: "identity-service",
      error: "Database connection failed",
    });
  }
});

app.get("/", (req, res) => {
  res.status(200).json({
    name: "Identity Service",
    version: "1.0.0",
    description: "Centralized authentication and authorization service",
    endpoints: {
      auth: "/api/v1/auth",
      users: "/api/v1/users",
      apiKeys: "/api/v1/api-keys",
      health: "/health",
      ready: "/ready",
    },
  });
});

app.use("/api/v1", router);

app.use(notFoundHandler);
app.use(errorHandler);

process.on("uncaughtException", (error) => {
  logger.error(`Uncaught Exception: ${error.message}`, error);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  logger.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

