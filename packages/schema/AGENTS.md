# @osprotocol/schema

TypeScript type definitions for the OS Protocol. Published to npm as `.ts` files directly (no compiled `.d.ts`).

## Interface Pattern

Every system interface follows the same structure:

1. **Entry type** — Data shape (e.g., `EnvEntry`, `FsEntry`). Always has `metadata?: Record<string, unknown>` for provider extensibility.
2. **Context interface** — Read-only facade for the agent loop's gather phase (e.g., `EnvContext`). Methods: `get()`, `list()`.
3. **Actions interface** — Write facade for the agent loop's act phase (e.g., `EnvActions`). Methods: `set()`, `remove()`, and domain-specific writes.
4. **Full interface** — Combined read/write for provider implementations (e.g., `Env`). This is what providers implement.

## Context/Actions Composition

`context/system.ts` composes all Context interfaces into `SystemContext`.
`actions/system.ts` composes all Actions interfaces into `SystemActions`.

These are pure composition — they don't add methods, they aggregate existing facades into a single entry point for the agent loop.

## Domains

| Directory | Purpose | Key insight |
|-----------|---------|-------------|
| `system/` | Infrastructure interfaces | Each file is one kernel capability. Read its JSDoc for provider analogues. |
| `context/` | Read facades + agent-facing read interfaces | `system.ts` is composition. `embeddings.ts` and `kv.ts` are agent-facing. |
| `actions/` | Write facades + agent-facing write interfaces | `system.ts` is composition. `tools.ts` and `mcp-servers.ts` are agent-facing. |
| `checks/` | Verification | `rules.ts` → `judge.ts` → `audit.ts` is the natural flow. `screenshot.ts` is visual verification. |
| `workflows/` | Execution patterns | See `workflows/AGENTS.md` |
| `runs/` | Execution control | See `runs/AGENTS.md` |
| `apps/` | Distribution manifests | See `apps/AGENTS.md` |

## Conventions

- All post-initial interfaces are tagged `@experimental` in JSDoc.
- Generic types (`Registry<T>`, `EnvEntry<T>`) enable typed provider implementations.
- `metadata?: Record<string, unknown>` appears on every Entry type — never remove it.
- Import paths match directory structure: `@osprotocol/schema/system/env`, `@osprotocol/schema/checks/rules`, etc.
- See `package.json` `exports` field for the complete list of public entry points.
