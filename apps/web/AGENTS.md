# Documentation Site

Next.js 16 app using Fumadocs for MDX documentation.

## Content Structure

All documentation lives in `content/docs/`. The directory structure mirrors `packages/schema/`:

- `content/docs/system/` → `packages/schema/system/`
- `content/docs/context/` → `packages/schema/context/`
- etc.

## Navigation

`content/docs/meta.json` controls the sidebar. When adding, removing, or moving pages, this file MUST be updated. Fumadocs auto-discovers pages in subdirectories, but top-level ordering depends on `meta.json`.

## Page Conventions

- Interface pages follow a template: frontmatter → `<Callout type="warn">` experimental notice → Overview → TypeScript API → Usage Examples → Integration.
- `<Callout>` is auto-provided by Fumadocs — no import needed.
- TypeScript code blocks show interfaces WITHOUT the `export` keyword.
- Headings for types use plain text (`### EnvEntry`), not backticks.
- Mermaid diagrams are supported via `remarkMdxMermaid` plugin.

## LLM Endpoints

The site serves:
- `/llms.txt` — Concise page index for LLM consumption
- `/llms-full.txt` — Full documentation content

## Commands

```bash
bun run --cwd apps/web dev    # Dev server
bun run build                 # Full build (via Turbo)
```
