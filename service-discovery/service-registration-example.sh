#!/bin/bash
# Example script for registering a service with Consul

SERVICE_NAME="example-service"
SERVICE_PORT=3000
CONSUL_URL="http://localhost:8500"

# Register service
curl -X PUT "${CONSUL_URL}/v1/agent/service/register" \
  -H "Content-Type: application/json" \
  -d '{
    "ID": "'${SERVICE_NAME}'",
    "Name": "'${SERVICE_NAME}'",
    "Tags": ["api", "v1"],
    "Address": "localhost",
    "Port": '${SERVICE_PORT}',
    "Check": {
      "HTTP": "http://localhost:'${SERVICE_PORT}'/health",
      "Interval": "10s",
      "Timeout": "5s"
    }
  }'

echo "Service ${SERVICE_NAME} registered with Consul"

