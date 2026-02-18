# What is OS Protocol

OS Protocol (OSP) is an open-source specification for orchestrating, managing, and executing AI agents in distributed environments. It is a **specification**, not a framework or library — it defines interfaces, behaviors, and data formats. Like HTTP enables browsers to talk to servers, OSP enables agents to collaborate.

## What It Does

OSP occupies the **orchestration and lifecycle layer** for AI agents — the gap between:

- **Agent Definition** (AGENTS.md ecosystem — how agents declare themselves)
- **Agent Communication** (Google A2A — how agents talk to each other)
- **Agent Tooling** (MCP by Anthropic — how agents use tools)

OSP defines what happens *between* those layers: how agents get context, take actions, verify their work, and execute workflows with lifecycle control.

## Who It's For

**Primary consumers**: framework and platform authors who build agentic systems. They implement the protocol interfaces against their infrastructure (Vercel, Cloudflare, AWS, etc.).

**Secondary consumers**: vendors who provide specific capabilities (vector databases, sandbox environments, observability tools). They implement individual interfaces.

**Not for**: individual developers directly. Developers consume the *implementation* (e.g., Syner OS), not the protocol itself. The protocol defines interoperability contracts between implementations.

## What It's Not

- Not a runtime or execution engine
- Not an agent framework (it doesn't tell you how to build agents)
- Not a communication protocol (that's A2A's job)
- Not a tool standard (that's MCP's job)

## Conformance

OSP allows **partial conformance**: implement the domains you need. A platform that only handles workflows and runs is a valid partial implementation. The protocol is modular by design.

## Package

The reference implementation is `@osprotocol/schema` — a types-only TypeScript package published to npm. No compiled `.d.ts`, just `.ts` files directly. It provides TypeScript types for all protocol interfaces.

```
npm install @osprotocol/schema
```
