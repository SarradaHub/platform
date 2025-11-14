# CI Toolkit

This directory contains examples and documentation for reusable GitHub Actions workflows. The actual reusable workflows are located in `.github/workflows/` and can be referenced via `workflow_call`.

## Available Workflows

| Workflow | Description |
| --- | --- |
| `.github/workflows/contracts.yaml` | Validates JSON Schemas with `ajv-cli` and runs service-specific contract tests. |
| `.github/workflows/rails-service-ci.yaml` | Comprehensive CI workflow for Rails services with linting, security checks, quality metrics, and testing. |
| `.github/workflows/node-monorepo-ci.yaml` | CI workflow for Node.js monorepos with linting, type checking, building, and testing (supports Prisma and PostgreSQL). |
| `.github/workflows/react-vite-ci.yaml` | CI workflow for React/Vite frontend projects with linting, formatting, type checking, testing, and building. |

### Usage

**Contracts Workflow:**
Add the following snippet to your repository (replace org/repo/branch as needed):

```yaml
jobs:
  contracts:
    uses: SarradaHub/platform/.github/workflows/contracts.yaml@main
    with:
      working-directory: sarradabet/apps/api
      install-command: npm install
      test-command: npm run contract:test
      schema-glob: platform/contracts/schemas/betting/*.json
```

**Rails Service CI Workflow:**
```yaml
jobs:
  rails-ci:
    uses: SarradaHub/platform/.github/workflows/rails-service-ci.yaml@main
    with:
      working-directory: .
      ruby-version: '3.3.6'
      run-brakeman: true
      run-importmap-audit: true
      run-rubycritic: true
      postgres-db: your_app_test
      rspec-command: bin/rails db:test:prepare && bundle exec rspec
      extra-apt-packages: "google-chrome-stable"
```

**Node Monorepo CI Workflow:**
```yaml
jobs:
  monorepo-ci:
    uses: SarradaHub/platform/.github/workflows/node-monorepo-ci.yaml@main
    with:
      working-directory: .
      node-version: '20'
      install-command: npm ci
      lint-command: npm run lint
      typecheck-command: npm run check-types
      build-command: npm run build
      prisma-generate: true
      prisma-working-directory: apps/api
      prepare-db-command: cd apps/api && npm run prisma:migrate:deploy && npm run db:seed:simple
      test-api-command: npm run test:api:coverage
      test-web-command: npm run test:web:coverage
      postgres-db: your_app_test
      db-url: postgresql://postgres:postgres@localhost:5432/your_app_test
      coverage-artifacts: true
```

**React Vite CI Workflow:**
```yaml
jobs:
  react-ci:
    uses: SarradaHub/platform/.github/workflows/react-vite-ci.yaml@main
    with:
      working-directory: .
      node-version: '20'
      install-command: npm ci
      lint-command: npm run lint
      format-command: npm run format
      test-command: npm run test -- --run --coverage
      build-command: npm run build
      coverage: true
      coverage-artifacts: true
```

## Contract Test Expectations
1. **Producer tests**: Assert that domain events conform to canonical schemas by invoking serializers and validating against JSON Schema via `ajv` or language-specific tooling.
2. **Consumer tests**: Replay fixture events to ensure deserializers, adapters, and side-effects succeed.
3. **Pipeline enforcement**: Require the `contracts` job to pass before merging schema or adapter changes.

See `examples/` for language-specific patterns (Rails + Node).
