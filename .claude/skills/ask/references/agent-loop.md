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

Each system capability splits into two interfaces:

```typescript
// context/system.ts — read-only facade
interface SystemContext {
  env: EnvContext      // get, list (no set, no remove)
  fs: FsContext        // read, list, stat (no write, no delete)
  // ... all read-only
}

// actions/system.ts — write facade
interface SystemActions {
  env: EnvActions      // set, remove
  fs: FsActions        // write, delete, mkdir
  // ... all write operations
}
```

Similarly for non-system capabilities:
- `EmbeddingsContext` (search, get) vs `EmbeddingsActions` (upsert, remove)
- `KvContext` (get, list) vs `KvActions` (set, remove)

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
