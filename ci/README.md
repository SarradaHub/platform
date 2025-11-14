# CI Toolkit

This directory contains reusable GitHub Actions workflows and examples that each service can reference via `workflow_call`.

## Available Workflows

| Workflow | Description |
| --- | --- |
| `workflows/contracts.yaml` | Validates JSON Schemas with `ajv-cli` and runs service-specific contract tests. |
| `workflows/rails-service-ci.yaml` | Standard Rails pipeline covering RuboCop, optional Brakeman/RubyCritic, and RSpec with Postgres service. |
| `workflows/node-monorepo-ci.yaml` | Node/Turborepo workflow for lint, type-check, build, API/web tests, and npm audit. |
| `workflows/react-vite-ci.yaml` | Vite-based React project workflow for lint, tests (with optional coverage artifact), and build. |

### Usage
Add the following snippet to your repository (replace org/repo/branch as needed):

```yaml
jobs:
  contracts:
    uses: LMafra/platform-event-mesh/platform/ci/workflows/contracts.yaml@main
    with:
      working-directory: sarradabet/apps/api
      install-command: npm install
      test-command: npm run contract:test
      schema-glob: platform/contracts/schemas/betting/*.json
```

## Contract Test Expectations
1. **Producer tests**: Assert that domain events conform to canonical schemas by invoking serializers and validating against JSON Schema via `ajv` or language-specific tooling.
2. **Consumer tests**: Replay fixture events to ensure deserializers, adapters, and side-effects succeed.
3. **Pipeline enforcement**: Require the `contracts` job to pass before merging schema or adapter changes.

See `examples/` for language-specific patterns (Rails + Node). Additional snippets:

### Example: Rails API
```yaml
jobs:
  contracts:
    uses: LMafra/SarradaHub/platform/ci/workflows/contracts.yaml@main
    with:
      working-directory: .
      install-command: bundle install
      test-command: bundle exec rspec spec/jobs/events/publish_match_scheduled_job_spec.rb

  rails-ci:
    uses: LMafra/SarradaHub/platform/ci/workflows/rails-service-ci.yaml@main
    with:
      working-directory: .
      ruby-version: '3.3.6'
      postgres-db: my_service_test
      rspec-command: bundle exec rspec
```

### Example: Node Monorepo
```yaml
jobs:
  monorepo-ci:
    uses: LMafra/SarradaHub/platform/ci/workflows/node-monorepo-ci.yaml@main
    with:
      working-directory: .
      prisma-generate: true
      prisma-working-directory: apps/api
      prepare-db-command: cd apps/api && npm run prisma:migrate:deploy && npm run db:seed
      test-api-command: npm run test:api
      test-web-command: npm run test:web
      postgres-db: service_test
      db-url: postgresql://postgres:postgres@localhost:5432/service_test
```

### Example: React Frontend
```yaml
jobs:
  react-ci:
    uses: LMafra/SarradaHub/platform/ci/workflows/react-vite-ci.yaml@main
    with:
      working-directory: .
      node-version: '20'
```
