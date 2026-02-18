# OS Protocol (OSP)

A specification for orchestrating AI agents. OSP defines TypeScript interfaces — the contracts you implement, not the code you run.

## Protocol Domains

| Domain | Path | What it defines |
|--------|------|-----------------|
| System | `packages/schema/system/` | Infrastructure interfaces: env, fs, sandbox, settings, preferences, registry, installer, mcp-client |
| Context | `packages/schema/context/` | Read-only facades for the agent loop's gather phase |
| Actions | `packages/schema/actions/` | Write facades for the agent loop's act phase |
| Checks | `packages/schema/checks/` | Verification: rules, judge, audit, screenshot |
| Workflows | `packages/schema/workflows/` | Execution patterns: routing, orchestrator-workers, parallelization, evaluator-optimizer |
| Runs | `packages/schema/runs/` | Execution control: run lifecycle, timeout, retry, cancel, approval |
| Apps | `packages/schema/apps/` | Distribution manifests: provider bindings per interface |

## How to Explore

- **Schema types**: Read the `.ts` files in `packages/schema/`. Each file has JSDoc explaining what it does, provider analogues, and the `@experimental` tag where applicable.
- **Package exports**: See `packages/schema/package.json` `exports` field for all import paths.
- **Documentation site**: `apps/web/content/docs/` has MDX pages for every interface. The site serves `/llms.txt` and `/llms-full.txt` for LLM-optimized access.
- **Deeper context**: Each subdirectory has its own AGENTS.md with domain-specific knowledge.

## Core Concepts

**Agentic OS**: The protocol models an operating system for agents. The LLM is the kernel. Agents request resources (files, env vars, tools, sandboxes) from the OS. The protocol standardizes those resource interfaces.

**Context/Actions Split**: Every system interface splits into a read-only Context facade (gather phase) and a write Actions facade (act phase). This enforces observe-before-mutate in the agent loop.

**Apps as Distributions**: An App is a distribution manifest declaring which vendors implement which protocol interfaces — like `package.json` for Node or `docker-compose.yml` for containers.

## Scope Boundaries

- Agent/skill definition (AGENT.md, SKILL.md) is a **platform concern**, not standardized by the protocol.
- Infrastructure (caching, blob storage) is a **provider concern** — the protocol defines the interfaces, not the backends.
- The protocol is the floor, not the ceiling — providers add capabilities beyond what OSP defines.
- If the schema doesn't define a type for it, the protocol doesn't standardize it.

## Project Structure

This is a monorepo managed with Turborepo and Bun:

- `packages/schema/` — `@osprotocol/schema` TypeScript types (published to npm as `.ts` files)
- `apps/web/` — Documentation site (Next.js + Fumadocs)
