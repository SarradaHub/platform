# CI Toolkit

This directory contains reusable GitHub Actions workflows and examples that each service can reference via `workflow_call`.

## Available Workflows

| Workflow | Description |
| --- | --- |
| `workflows/contracts.yaml` | Validates JSON Schemas with `ajv-cli` and runs service-specific contract tests. |

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

See `examples/` for language-specific patterns (Rails + Node).
