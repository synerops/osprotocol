# Apps

Distribution manifests for the Agentic OS. An App declares which vendors implement which protocol interfaces.

## Format

YAML frontmatter (structured manifest) + free-form markdown body (documentation). The filename is author's choice — `SYNER.md`, `APP.md`, `ACADEMY.md` — the format is what matters.

## Provider Bindings

`ProviderMap` maps protocol domains → individual interfaces → concrete providers. Granularity is per interface, not per domain:

```yaml
providers:
  system:
    env: { provider: '@vercel/env' }
    sandbox: { provider: '@vercel/sandbox', version: '^1.0.0' }
  context:
    embeddings: { provider: '@upstash/vector' }
  checks:
    judge: { provider: '@braintrust/judge' }
```

## Key Types

- `ProviderEntry` — Maps one interface to one vendor (`provider`, `version?`, `enabled?`, `metadata?`)
- `ProviderMap` — Organized by domain: `system?`, `context?`, `actions?`, `checks?`
- `AppMetadata` — Frontmatter fields: `name`, `version`, `description?`, `protocol?`, `providers?`
- `App` — Full definition: `metadata` + `content` (markdown body) + `path` (source file)

## Analogues

Think `package.json` for Node, `docker-compose.yml` for containers, `vercel.json` for deployments. The App manifest is the equivalent for a complete agentic system configuration.
