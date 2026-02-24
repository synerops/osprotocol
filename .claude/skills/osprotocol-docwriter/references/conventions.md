# Documentation Conventions

## File Format

All doc pages are MDX files in `apps/web/content/docs/`. Fumadocs processes them with MDX and renders them on the documentation site.

## Frontmatter

Every page requires YAML frontmatter with at minimum:

```yaml
---
title: Environment
description: Platform environment variable management for agent workloads
---
```

- `title` — concise, matches the interface name or concept
- `description` — one sentence, what this page documents

Optional: `icon` (for navigation).

## Page Structure

### Interface Pages

Follow this order strictly:

1. **Overview** — 2-3 sentences: what this interface is and its role in the protocol. No generic fluff.
2. **Diagram** (optional) — Mermaid flowchart or state diagram, only if it clarifies behavior. Not decorative.
3. **TypeScript API** — The import statement, then each type/interface with its definition copied from the schema source.
4. **Usage Examples** — 2-3 concrete examples showing different configurations or use cases.
5. **Integration** — Brief list of how this connects to other protocol interfaces.

### Domain Index Pages

1. **Overview** — What this domain covers, its role in the protocol.
2. **Cards** — Fumadocs `<Cards>` component linking to all sub-pages with icons and descriptions.
3. **How It Works** (optional) — Brief explanation of domain mechanics.
4. **Integration** — How this domain connects to others.

### Concept Pages

No strict template. Follow conventions for tone and structure, but organize content as the concept demands.

## TypeScript API Section

### Import Statement

Always show the real import path first:

```ts
import type { Timeout, TimeoutAction } from 'osprotocol/runs/timeout'
```

Verify the import path exists in `packages/schema/package.json` exports. If it doesn't, the path is wrong.

### Type Definitions

Copy the type definition from the schema source. Do not paraphrase or simplify.

```ts
interface Timeout {
  /** Timeout duration in milliseconds */
  ms: number
  /** Action to take when timeout occurs (default: 'fail') */
  onTimeout?: TimeoutAction
  /** Callback function when timeout occurs */
  onTimeoutCallback?: () => void
}
```

Show each type separately with a heading (h3) and a one-line description before the code block.

### @experimental Interfaces

For interfaces marked `@experimental` in the schema, add a callout after the Overview:

```mdx
<Callout type="warn">
  This interface is experimental — no production implementation exists yet.
  The API surface may change.
</Callout>
```

## Usage Examples

- Show real, plausible scenarios — not toy examples
- Use descriptive variable names that reveal intent
- Each example should demonstrate a different aspect of the interface
- Include a brief comment or heading explaining what each example shows

## Mermaid Diagrams

Use Mermaid when it adds clarity:

- **State diagrams** for lifecycle types (`RunStatus`, `SandboxStatus`)
- **Flowcharts** for decision flows (`TimeoutAction` branching)
- **Sequence diagrams** for multi-step interactions (approval flow)

Do not use Mermaid for:
- Listing features (use a table instead)
- Showing type hierarchies (use TypeScript code instead)
- Decoration

## Fumadocs Components

Available components (imported automatically):

- `<Cards>` + `<Card>` — grid of linked cards for index pages
- `<Callout type="info|warn|error">` — callout boxes
- `<Tabs>` + `<Tab>` — tabbed content

Use `<Cards>` for domain index pages. Use `<Callout>` sparingly — only for @experimental warnings or important caveats.

## Navigation Menu (meta.json)

`apps/web/content/docs/meta.json` controls the sidebar navigation for the entire documentation site. It defines page order, section separators (`---Section Name---`), and external links.

**After every structural change** (adding, removing, or moving pages), update `meta.json`:

- **Removing a page**: Delete its entry from the `pages` array. If a whole section becomes empty, remove the section separator too.
- **Adding a page**: Insert its entry in the correct section and logical order.
- **Renaming/moving a page**: Update the path in `meta.json` to match.
- **Section separators**: Use `---Section Name---` format. Review that section names still make sense after changes.

This is a **mandatory step** — skipping it leaves broken links in the sidebar or hides new pages from navigation.

## Links

- Internal links use relative paths: `/docs/runs/timeout`
- Never link to pages that don't exist
- Verify all links point to real pages in the `content/docs/` directory

## What NOT to Write

- "Coming soon" or "This page will cover..."
- Generic bullet lists ("Manage X", "Handle Y", "Support Z")
- Marketing language ("powerful", "seamless", "comprehensive")
- Content that isn't backed by the schema — if the type doesn't exist in `packages/schema/`, don't document it
- Changelog-style content ("previously this was...", "this replaced...")
