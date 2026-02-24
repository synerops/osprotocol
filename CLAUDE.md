# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## When to Use osprotocol-guide

**IMPORTANT**: For conceptual questions about the protocol, use the `osprotocol-guide` subagent instead of answering from this file.

Use `osprotocol-guide` for:
- "What is X?" / "Why does Y work this way?"
- Architecture and design decisions
- Domain boundaries (e.g., "is audit a workflow?")
- Protocol semantics and concepts

Use this CLAUDE.md for:
- How to run commands
- Where files are located
- Release workflow
- Implementation tasks

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

The `osprotocol` package is published as a **types-only package** (`.ts` files directly, no compiled `.d.ts`). The `apps/web` package is excluded from publishing.

## Architecture

### Monorepo Structure

```
protocol/
├── apps/web/           # Next.js documentation site
│   ├── app/            # App Router pages and API routes
│   ├── content/docs/   # MDX documentation files
│   ├── components/     # React components
│   └── lib/            # Shared utilities (source.ts, metadata.ts)
└── packages/schema/    # osprotocol - Protocol type definitions
    ├── system/         # System interfaces (env, fs, sandbox, settings, preferences, registry, installer, mcp-client)
    ├── context/        # Context facades (system context, embeddings, kv)
    ├── actions/        # Action facades (system actions, tools, mcp-servers)
    ├── checks/         # Verification (rules, judge, audit, screenshot)
    ├── workflows/      # Workflow patterns (routing, orchestrator-workers, parallelization, evaluator-optimizer)
    ├── runs/           # Run control (run, timeout, retry, cancel, approval)
    └── apps/           # Distribution manifests (app schema, provider bindings)
```

### Schema Package Exports

The `osprotocol` package provides TypeScript types for the protocol. See `packages/schema/package.json` `exports` field for the full list. Key entry points:

- `osprotocol` - Main barrel export
- `osprotocol/workflows` - Workflow patterns
- `osprotocol/runs` - Run control
- `osprotocol/system/*` - System interfaces (env, fs, sandbox, settings, preferences, registry, installer, mcp-client)
- `osprotocol/context/*` - Context facades (system, embeddings, kv)
- `osprotocol/actions/*` - Action facades (system, tools, mcp-servers)
- `osprotocol/checks/*` - Verification (rules, judge, audit, screenshot)
- `osprotocol/apps/schema` - Distribution manifest types

### Documentation Site

- Uses Fumadocs with MDX for documentation (`content/docs/`)
- Documentation structure mirrors schema structure (e.g., `content/docs/workflows/` corresponds to `packages/schema/workflows/`)
- Mermaid diagrams enabled via `remarkMdxMermaid` plugin
- LLM-friendly endpoints at `/llms.txt` and `/llms-full.txt`

