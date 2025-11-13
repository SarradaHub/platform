# Platform Overview

The `platform` project provides shared capabilities that power the SarradaHub event driven ecosystem. It defines canonical event contracts, ships reusable CI tooling, and exposes an event gateway so that individual services can publish consistent messages.

## Structure

- `contracts`: JSON Schema and AsyncAPI definitions for canonical events that flow across product teams.
- `ci`: GitHub Actions workflows and examples that enforce contract validation and other shared automation.
- `event-gateway`: Node.js service that validates inbound events against the schema registry and forwards them to Kafka.

## Working Agreements

- Any change to canonical schemas must include updated fixtures and contract tests in the affected services.
- Keep CI workflows backwards compatible when possible so other repositories can reuse them without breaking changes.
- Coordinate releases of the event gateway with infrastructure updates in `infra/terraform` to keep schema registry and Kafka configuration aligned.

