# Agent Loop

## Overview

The Agent Loop is the cognitive micro-pattern that every agent follows:

```
context (read) → actions (write) → checks (verify) → iterate
```

It is **implicit** — there is no `AgentLoop` type in the protocol. Instead, the three Agent Loop domains (context, actions, checks) enforce the pattern through their interfaces. This is deliberate: implicit composition is more flexible than a rigid type, and it doesn't break when domains evolve.

## Read/Write Separation (Zero-Trust by Phase)

The agent loop enforces a strict read/write boundary:

- **Context phase**: read-only. The agent gathers information but cannot mutate state. All context interfaces expose only read operations (`get`, `search`, `list`).
- **Actions phase**: write. The agent executes operations and mutates state (`set`, `remove`, `upsert`, tool execution).
- **Checks phase**: verify. The agent validates what was done (rules, audit, judge, screenshot).

This is **zero-trust by agent loop phase** — an agent in the context phase literally cannot call write operations because the interface doesn't expose them.

### How It's Implemented

Each system capability splits into a Context (read) and Actions (write) interface in the same file. The facades compose them:

- `SystemContext` (in `packages/schema/context/system.ts`) — composes all read interfaces (EnvContext, FsContext, etc.)
- `SystemActions` (in `packages/schema/actions/system.ts`) — composes all write interfaces (EnvActions, FsActions, etc.)

Non-system capabilities follow the same split:
- `EmbeddingsContext` (search, get) vs `EmbeddingsActions` (upsert, remove) — in `packages/schema/context/embeddings.ts`
- `KvContext` (get, list) vs `KvActions` (set, remove) — in `packages/schema/context/kv.ts`

## Context Domain

What the agent knows. Dynamic, per-run information.

| Interface | Purpose | Methods |
|-----------|---------|---------|
| `SystemContext` | Read-only view of all 8 system interfaces | Facade composing `EnvContext`, `FsContext`, etc. |
| `EmbeddingsContext` | Semantic search over indexed knowledge | `search(query, topK, filter)`, `get(id)` |
| `KvContext` | Key-value lookups | `get(key)`, `list(prefix)` |

Context is built on top of System but exposes agent-oriented interfaces. System is static infrastructure; context is dynamic per-run information.

## Actions Domain

What the agent can do.

| Interface | Purpose | Key Types |
|-----------|---------|-----------|
| `SystemActions` | Write operations for all 8 system interfaces | Facade composing `EnvActions`, `FsActions`, etc. |
| `Tools` | Tool registration and execution | `Tool`, `ToolResult` |
| `McpServers` | MCP server communication | `McpResource`, `McpPrompt` |
| `EmbeddingsActions` | Index and remove embeddings | `upsert(id, content, metadata)`, `remove(id)` |
| `KvActions` | Write key-value data | `set(key, value)`, `remove(key)` |

## Checks Domain

How the agent verifies its work. Checks present results and can trigger approval requests (connecting to `runs/approval`).

| Interface | Purpose | Key Types |
|-----------|---------|-----------|
| `Rules` | Declarative verification criteria | `Rule`, `RuleResult`, `RuleSeverity` |
| `Judge` | LLM-as-judge evaluation | `JudgeConfig`, `JudgeResult` |
| `Audit` | Immutable audit trail | `AuditEntry` |
| `Screenshot` | Visual verification for sandbox environments | `ScreenshotEntry`, `ComparisonResult` |
