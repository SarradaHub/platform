import { startServer } from "./server";
import { logger } from "./logger";

startServer().catch((error) => {
  logger.error({ error }, "Failed to start event gateway");
  process.exit(1);
});
