# Monitoring & Observability

Prometheus and Grafana setup for monitoring SarradaHub microservices.

## Components

- **Prometheus**: Metrics collection and storage
- **Grafana**: Visualization and dashboards

## Usage

Start monitoring stack:

```bash
cd platform/monitoring
docker compose up -d
```

Access:
- Prometheus: http://localhost:9090
- Grafana: http://localhost:3001 (admin/admin)

## Metrics

Services should expose metrics at `/metrics` endpoint:
- HTTP request rate
- HTTP error rate
- Response time (histograms)
- Circuit breaker state
- Database connection pool
- Custom business metrics

## Dashboards

Pre-configured dashboards:
- Services Overview
- Service Health
- Request Rate
- Error Rate
- Response Time

## Alerts

Alert rules configured in `alert_rules.yml`:
- Service Down
- High Error Rate
- High Response Time
- Circuit Breaker Open

## Adding Metrics to Services

### Node.js/Express
```javascript
const promClient = require('prom-client');
const register = new promClient.Registry();

promClient.collectDefaultMetrics({ register });

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});
```

### Rails
Use `prometheus-client` gem:
```ruby
require 'prometheus/client'

Prometheus::Client.registry.get(:http_requests_total).increment
```

