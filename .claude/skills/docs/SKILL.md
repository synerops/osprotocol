---
name: docs
description: >
  Write, edit, review, and triage documentation pages for the OS Protocol website
  (apps/web/content/docs/). Use when creating new doc pages, rewriting placeholders,
  reviewing existing pages for accuracy, or triaging pages (rewrite/deprecate/roadmap).
  Triggers on: writing docs, doc page, MDX, placeholder page, documentation triage,
  rewrite page, update docs, content/docs.
---

# /docs — OS Protocol Documentation Writer

Guide for writing and maintaining documentation pages in `apps/web/content/docs/`.

## Workflow

### 1. Verify the source of truth

Before writing any doc page, read the corresponding TypeScript file in `packages/schema/`. The types are the protocol. The doc page documents them — it does not invent content.

- Interface page → read the `.ts` file (e.g., `packages/schema/system/env.ts` for `system/env.mdx`)
- Domain index page → read the domain's `index.ts` barrel file
- Concept page → read relevant schema files + consult `/ask` skill references

If there is no corresponding `.ts` file, the page has no schema backing and should be flagged for deprecation or roadmap status.

### 2. Choose the right template

| Page type | Template | Example |
|-----------|----------|---------|
| Interface page (@experimental or stable) | See [templates.md](references/templates.md#interface-page) | `runs/timeout.mdx` |
| Domain index page | See [templates.md](references/templates.md#domain-index-page) | `system/index.mdx` |
| Concept page | No strict template — but follow conventions | `concepts/agent-loop.mdx` |

### 3. Write following conventions

Read [conventions.md](references/conventions.md) for the full style guide. Key rules:

- Import paths must be real and verifiable (`@osprotocol/schema/system/env`)
- TypeScript interfaces must match the schema exactly — copy from source, don't paraphrase
- Mermaid diagrams when they clarify flow or state, not for decoration
- No "Coming soon", no generic bullet lists, no marketing language

### 4. Validate

After writing, verify:
- The import path exists in `packages/schema/package.json` exports
- All type names match the schema exactly
- Links to other pages use correct paths
- Frontmatter has title and description

## Reference Files

| Task | File |
|------|------|
| Current state of all 48 doc pages | [inventory.md](references/inventory.md) |
| Writing style, structure, frontmatter | [conventions.md](references/conventions.md) |
| Templates for interface and index pages | [templates.md](references/templates.md) |
| Why runs/timeout.mdx works as a model | [gold-standard.md](references/gold-standard.md) |

## What This Skill Is NOT

- Not for answering protocol questions → use `/ask`
- Not for implementing protocol interfaces → use `/develop` (planned)
- Not for writing non-documentation content (blog posts, marketing)
