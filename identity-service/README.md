# Identity Service

Centralized authentication and authorization service for SarradaHub microservices.

## Features

- User registration and login
- JWT token generation and validation
- API key management for service-to-service authentication
- User profile management
- Session management
- Token refresh

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login and get tokens
- `POST /api/v1/auth/validate` - Validate token (for API Gateway)
- `POST /api/v1/auth/refresh` - Refresh access token
- `POST /api/v1/auth/logout` - Logout and invalidate session

### Users
- `GET /api/v1/users/:id` - Get user by ID
- `GET /api/v1/users` - Get current user
- `PATCH /api/v1/users/:id` - Update user profile

### API Keys
- `POST /api/v1/api-keys` - Create API key
- `GET /api/v1/api-keys` - List user's API keys
- `DELETE /api/v1/api-keys/:id` - Revoke API key

### Health Checks
- `GET /health` - Service health check
- `GET /ready` - Readiness check (includes database)

## Development

```bash
# Install dependencies
npm install

# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate:dev

# Start development server
npm run dev
```

## Docker

```bash
# Start with Docker Compose
docker compose up -d

# Run migrations
docker compose exec identity-service npm run prisma:migrate:deploy
```

## Environment Variables

See `.env.example` for required environment variables.

## Database

Uses PostgreSQL with Prisma ORM. The database schema includes:
- Users
- API Keys
- Sessions

