# Agent OS Protocol

A protocol for orchestrating, managing, and executing AI agents in distributed, scalable environments.

Maintained by [@synerops](https://github.com/synerops) (current phase: `brainstorming`)

## Monorepo Structure

This is a Turborepo monorepo containing:

- **`apps/web`**: The documentation website (Next.js + Fumadocs)
- **`packages/schema`**: Core protocol TypeScript definitions and schemas

## Getting Started

### Prerequisites

- Node.js >= 20.0.0
- Bun >= 1.0.0

### Installation

```bash
bun install
```

### Development

Run all apps in development mode:

```bash
bun run dev
```

Run a specific app:

```bash
turbo run dev --filter=@osprotocol/web
```

### Build

Build all packages and apps:

```bash
bun run build
```

### Type Checking

Type check all packages:

```bash
bun run typecheck
```

### Clean

Clean all build artifacts and node_modules:

```bash
bun run clean
```

## Packages

### `@osprotocol/schema`

Core protocol TypeScript definitions. This package contains all the protocol schemas and types used across the ecosystem.

### `@osprotocol/web`

The documentation website built with Next.js and Fumadocs.

## Documentation

See [AGENTS.md](./AGENTS.md) for detailed information about the agent architecture and capabilities.
