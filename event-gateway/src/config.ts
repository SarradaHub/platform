import { config as loadEnv } from "node:process";

const env = loadEnv.env;

function requireEnv(name: string): string {
  const value = env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const appConfig = {
  port: Number(env.PORT ?? 4000),
  awsRegion: requireEnv("AWS_REGION"),
  glueRegistryName: requireEnv("GLUE_REGISTRY_NAME"),
  kafkaBrokers: requireEnv("KAFKA_BROKERS").split(","),
  kafkaClientId: env.KAFKA_CLIENT_ID ?? "platform-event-gateway",
  kafkaSsl: env.KAFKA_SSL !== "false",
  kafkaSasl: env.KAFKA_USERNAME
    ? {
        mechanism: (env.KAFKA_SASL_MECHANISM ?? "plain") as
          | "plain"
          | "scram-sha-256"
          | "scram-sha-512",
        username: env.KAFKA_USERNAME,
        password: requireEnv("KAFKA_PASSWORD"),
      }
    : undefined,
  schemaCacheTtlMs: Number(env.SCHEMA_CACHE_TTL_MS ?? 300_000),
};
