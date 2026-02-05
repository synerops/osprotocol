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
```

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
    ├── workflows/      # Workflow pattern types (routing, parallelization, etc.)
    ├── runs/           # Run control types (timeout, retry, cancel, approval)
    ├── agent.ts        # Agent schema (AGENT.md structure)
    └── skill.ts        # Skill schema (SKILL.md structure)
```

### Schema Package Exports

The `@osprotocol/schema` package provides TypeScript types for the protocol:

- `@osprotocol/schema` - Main exports (all types)
- `@osprotocol/schema/workflows` - Workflow patterns (Routing, OrchestratorWorkers, Parallelization, EvaluatorOptimizer)
- `@osprotocol/schema/runs` - Run control (Timeout, Retry, Cancel, Approval)
- `@osprotocol/schema/agent` - Agent definition types
- `@osprotocol/schema/skill` - Skill definition types

### Documentation Site

- Uses Fumadocs with MDX for documentation (`content/docs/`)
- Documentation structure mirrors schema structure (e.g., `content/docs/workflows/` corresponds to `packages/schema/workflows/`)
- Mermaid diagrams enabled via `remarkMdxMermaid` plugin
- LLM-friendly endpoints at `/llms.txt` and `/llms-full.txt`

### Key Concepts

**Agents**: Primary actors defined in `AGENT.md` files with YAML frontmatter metadata. Agents have tools, workflows, and discovery annotations.

**Skills**: Capabilities/APIs defined in `SKILL.md` files. Skills belong to protocol domains: `system`, `context`, `actions`, `checks`, `skills`, `workflows`, `runs`.

**Workflows**: Execution patterns based on Anthropic's building blocks for agentic systems:
- Routing - classify and delegate
- Orchestrator-Workers - plan, delegate, synthesize
- Parallelization - split, parallel execute, merge
- Evaluator-Optimizer - generate, evaluate, refine
