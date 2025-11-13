# Platform Event Gateway

API front door for canonical events. Validates payloads against the shared schema registry and forwards them to Kafka.

## Features
- REST ingestion endpoint (`POST /events/:subject`).
- Schema validation via AWS Glue Schema Registry and Ajv.
- Kafka publishing with JSON serialization.
- Health probe at `/health`.
- Structured logging via Pino.

## Getting Started
```bash
cd platform/event-gateway
npm install
npm run dev
```

Required environment variables:

| Variable | Description |
| --- | --- |
| `PORT` | HTTP port (default 4000) |
| `AWS_REGION` | AWS region containing Glue registry |
| `GLUE_REGISTRY_NAME` | Glue Schema Registry name |
| `KAFKA_BROKERS` | Comma-separated list of Kafka brokers |
| `KAFKA_CLIENT_ID` | Optional Kafka client ID |
| `KAFKA_SSL` | Set to `false` to disable TLS |
| `KAFKA_SASL_MECHANISM` | Optional SASL mechanism (`plain`, `scram-sha-256`, `scram-sha-512`) |
| `KAFKA_USERNAME` / `KAFKA_PASSWORD` | Optional SASL credentials |
| `SCHEMA_CACHE_TTL_MS` | Schema cache TTL (default 300000) |

## Tests
```bash
npm test
```

## Deployment
Build the production bundle with `npm run build`. Deploy as a container with access to AWS credentials (Glue + Kafka). Pair with Terraform MSK cluster (`infra/terraform`) and configure network security groups to allow HTTPS traffic from producer services.
