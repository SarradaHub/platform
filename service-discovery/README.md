# Service Discovery (Consul)

Consul provides service discovery, health checking, and key-value storage for SarradaHub microservices.

## Features

- Service registration and discovery
- Health checking
- Key-value configuration store
- DNS-based service resolution
- Service mesh connectivity (Connect)

## Usage

Start Consul:

```bash
cd platform/service-discovery
docker compose up -d
```

Access Consul UI at: http://localhost:8500

## Service Registration

Services register themselves with Consul on startup. Each service includes:
- Service name
- Service address and port
- Health check endpoint
- Tags (optional)

## Service Discovery

Services can discover other services via:
1. **HTTP API**: `http://consul:8500/v1/health/service/{service-name}`
2. **DNS**: `{service-name}.service.consul`

## Health Checks

Services must provide health check endpoints:
- `/health` - Basic health check
- `/ready` - Readiness check (includes dependencies)

Consul will automatically deregister unhealthy services.

## Key-Value Store

Store configuration in Consul KV:
- Circuit breaker thresholds
- Feature flags
- Service-specific configuration

Example:
```bash
curl -X PUT http://localhost:8500/v1/kv/config/circuit-breaker/sarradabet-api \
  -d '{"errorThreshold": 50, "timeout": 5000}'
```

## Integration

Each service should:
1. Register with Consul on startup
2. Provide health check endpoints
3. Use Consul for service discovery
4. Update health status periodically

