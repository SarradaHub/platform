# API Gateway (Traefik)

The API Gateway serves as the single entry point for all client requests to microservices.

## Features

- Request routing to backend services
- Authentication/authorization delegation to Identity Service
- Rate limiting per service
- CORS handling
- SSL/TLS termination
- Health check aggregation
- Request/response compression
- Security headers

## Configuration

- `traefik.yml`: Static Traefik configuration
- `dynamic/routes.yml`: Service routing rules
- `dynamic/middlewares.yml`: Middleware definitions (auth, rate limiting, CORS, etc.)

## Usage

Start the API Gateway:

```bash
cd platform/api-gateway
docker compose up -d
```

Access the Traefik dashboard at: http://localhost:8080

## Service Routes

All services are accessible via `api.sarradahub.local`:

- Identity Service: `/api/v1/auth/*`, `/api/v1/users/*`
- Pickup Game Manager: `/api/v1/athletes`, `/api/v1/matches`, `/api/v1/payments`, etc.
- SarradaBet API: `/api/v1/bets`, `/api/v1/categories`, `/api/v1/votes`, `/api/v1/admin`
- Saturday League API: `/api/v1/championships`, `/api/v1/rounds`, `/api/v1/matches`, etc.

## Authentication

Most routes require authentication via the `auth-identity` middleware, which forwards requests to the Identity Service for validation.

Public routes (no auth required):
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `GET /api/v1/*/health` (health checks)

## Rate Limiting

Each service has configured rate limits:
- Pickup Game Manager: 100 req/min (burst: 50)
- SarradaBet API: 200 req/min (burst: 100)
- Saturday League API: 150 req/min (burst: 75)
- Identity Service: 50 req/min (burst: 25)

## Development

For local development, add to `/etc/hosts`:
```
127.0.0.1 api.sarradahub.local
```

