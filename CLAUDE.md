# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

OS Protocol (Operating System Protocol) is an open-source specification for orchestrating, managing, and executing AI agents in distributed environments. The project consists of:

- **Documentation website** (`apps/web`): Next.js 16 app using Fumadocs for MDX documentation
- **Schema package** (`packages/schema`): TypeScript type definitions for the protocol

## Commands

```bash
# Development
bun install          # Install dependencies
bun run dev          # Start development server (all workspaces via Turbo)

# Build & Type Checking
bun run build        # Build all packages
bun run typecheck    # Type check all packages

# Single workspace commands
bun run --cwd apps/web dev         # Run only web app
bun run --cwd packages/schema typecheck  # Check only schema types

# Clean
bun run clean        # Clean all build artifacts

# Release (Changesets)
bun run changeset    # Create a new changeset (describe your change)
bun run version      # Apply changesets and bump versions
bun run release      # Publish to npm
```

## Release Workflow

This project uses [Changesets](https://github.com/changesets/changesets) for versioning and npm publishing.

1. Make changes to `packages/schema`
2. Run `bun run changeset` and describe the change (patch/minor/major)
3. Commit the changeset file with your changes
4. Push and create a PR
5. On merge to `main`, GitHub Actions creates a "Version Packages" PR
6. On merge of that PR, GitHub Actions publishes to npm automatically

The `@osprotocol/schema` package is published as a **types-only package** (`.ts` files directly, no compiled `.d.ts`). The `apps/web` package is excluded from publishing.

## Architecture

### Monorepo Structure

```
protocol/
├── apps/web/           # Next.js documentation site
│   ├── app/            # App Router pages and API routes
│   ├── content/docs/   # MDX documentation files
│   ├── components/     # React components
│   └── lib/            # Shared utilities (source.ts, metadata.ts)
└── packages/schema/    # @osprotocol/schema - Protocol type definitions
    ├── system/         # System interfaces (env, fs, sandbox, settings, preferences, registry, installer, mcp-client)
    ├── context/        # Context facades (system context, embeddings, kv)
    ├── actions/        # Action facades (system actions, tools, mcp-servers)
    ├── checks/         # Verification (rules, judge, audit, screenshot)
    ├── workflows/      # Workflow patterns (routing, orchestrator-workers, parallelization, evaluator-optimizer)
    ├── runs/           # Run control (run, timeout, retry, cancel, approval)
    └── apps/           # Distribution manifests (app schema, provider bindings)
```

### Schema Package Exports

The `@osprotocol/schema` package provides TypeScript types for the protocol. See `packages/schema/package.json` `exports` field for the full list. Key entry points:

- `@osprotocol/schema` - Main barrel export
- `@osprotocol/schema/workflows` - Workflow patterns
- `@osprotocol/schema/runs` - Run control
- `@osprotocol/schema/system/*` - System interfaces (env, fs, sandbox, settings, preferences, registry, installer, mcp-client)
- `@osprotocol/schema/context/*` - Context facades (system, embeddings, kv)
- `@osprotocol/schema/actions/*` - Action facades (system, tools, mcp-servers)
- `@osprotocol/schema/checks/*` - Verification (rules, judge, audit, screenshot)
- `@osprotocol/schema/apps/schema` - Distribution manifest types

### Documentation Site

- Uses Fumadocs with MDX for documentation (`content/docs/`)
- Documentation structure mirrors schema structure (e.g., `content/docs/workflows/` corresponds to `packages/schema/workflows/`)
- Mermaid diagrams enabled via `remarkMdxMermaid` plugin
- LLM-friendly endpoints at `/llms.txt` and `/llms-full.txt`

### Key Concepts

**Protocol Domains**: The schema is organized into 6 domains:
- **System** - Infrastructure interfaces (env, fs, sandbox, settings, preferences, registry, installer, mcp-client)
- **Context** - Read-only facades for the agent loop's gather phase (SystemContext, Embeddings, KV)
- **Actions** - Write facades for the agent loop's act phase (SystemActions, Tools, McpServers)
- **Checks** - Verification interfaces (Rules, Judge, Audit, Screenshot)
- **Workflows** - Execution patterns based on Anthropic's building blocks (Routing, Orchestrator-Workers, Parallelization, Evaluator-Optimizer)
- **Runs** - Execution control (Run, Timeout, Retry, Cancel, Approval)

**Apps**: Distribution manifests that declare which vendors implement which protocol interfaces. Defined in `apps/schema.ts`.

**Context/Actions Split**: Each system interface has a read-only Context facade (gather phase) and a write Actions facade (act phase). SystemContext composes all Context interfaces; SystemActions composes all Actions interfaces.

**Agent/Skill Definition**: Defining agents (AGENT.md) and skills (SKILL.md) is a platform concern, not standardized by the protocol. The protocol defines the interfaces that agents and skills interact with.
