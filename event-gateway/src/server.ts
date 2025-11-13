import express, { NextFunction, Request, Response } from "express";
import createError from "http-errors";

import { appConfig } from "./config";
import { KafkaProducer, createKafkaConsumer } from "./kafka";
import { logger } from "./logger";
import { SchemaRegistry } from "./schema-registry";

export function buildServer({
  producer,
  registry,
}: {
  producer: KafkaProducer;
  registry: SchemaRegistry;
}) {
  const app = express();

  app.use(express.json({ limit: "1mb" }));

  app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok" });
  });

  app.post(
    "/events/:subject",
    async (req: Request, res: Response, next: NextFunction) => {
      const subject = req.params.subject;

      try {
        const validator = await registry.getValidator(subject);
        const event = req.body;

        const valid = validator(event);
        if (!valid) {
          const errors = (validator.errors ?? []).map((err) => ({
            message: err.message,
            path: err.instancePath,
          }));

          throw createError(422, "Schema validation failed", { errors });
        }

        await producer.publish(subject, event);
        res.status(202).json({ accepted: true });
      } catch (error) {
        next(error);
      }
    },
  );

  app.get("/streams/:subject", async (req, res, next) => {
    const subject = req.params.subject;

    try {
      const consumer = await createKafkaConsumer(`event-gateway-stream-${Date.now()}`);
      res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      });
      res.flushHeaders?.();
      res.write(": connected\n\n");

      await consumer.subscribe({ topic: subject, fromBeginning: false });

      void consumer.run({
        eachMessage: async ({ message }) => {
          if (!message.value) return;
          res.write(`data: ${message.value.toString()}\n\n`);
        },
      });

      req.on("close", async () => {
        await consumer.disconnect();
      });
    } catch (error) {
      next(error);
    }
  });

  app.use(
    (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
      if (createError.isHttpError(err)) {
        logger.warn({ err }, "Request validation error");
        res.status(err.status ?? 500).json({
          message: err.message,
          errors: (err as createError.HttpError & { errors?: unknown }).errors,
        });
        return;
      }

      logger.error({ err }, "Unexpected error during event ingestion");
      res.status(500).json({ message: "Internal server error" });
    },
  );

  return app;
}

export async function startServer() {
  const producer = new KafkaProducer();
  const registry = new SchemaRegistry();

  await producer.connect();

  const app = buildServer({ producer, registry });

  const server = app.listen(appConfig.port, () => {
    logger.info({ port: appConfig.port }, "Event gateway listening");
  });

  const shutdown = async () => {
    logger.info("Shutting down event gateway");
    server.close();
    await producer.disconnect();
    process.exit(0);
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}
