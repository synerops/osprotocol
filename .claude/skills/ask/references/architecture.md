# Architecture

## The OS Metaphor

The OS metaphor is **structural, not pedagogical**. It dictates architecture, not just explanation.

| Traditional OS | Agentic OS | Protocol Domain |
|----------------|------------|-----------------|
| CPU Cycles | Inference / Tokens | (runtime concern) |
| RAM | Context Window | context/ |
| Disk / Filesystem | Vector Store / RAG / KV | context/, system/fs |
| Device Drivers | Tools / MCP | actions/ |
| Process Scheduler | Agent Orchestrator | workflows/, runs/ |
| Kernel | System infrastructure | system/ |
| Process Cycle | Agent Loop | context→actions→checks |

The "user" of the Agentic OS is the **agent**, not the human. The agent requests resources from the OS. The human is the external administrator.

## 4 Categories

The protocol is organized into 4 categories with 6 domains:

### 1. Agent Loop

The process cycle. How an agent perceives, acts, and verifies. Three domains compose the loop implicitly — there is no dedicated `AgentLoop` type.

```
context (read) → actions (write) → checks (verify)
```

- **context/** — What the agent knows. Read-only per-run information. Embeddings, key-value persistence, read-only system state.
- **actions/** — What the agent can do. Tool execution, MCP server communication, system mutations.
- **checks/** — How the agent verifies its work. Rules validation, LLM-as-judge, audit trails, visual verification.

### 2. System

The kernel. Platform environment, vendor-provided infrastructure. Static, not per-run.

- **system/** — Environment variables, filesystem, sandbox, settings, preferences, registry, MCP client, installer. 8 interfaces total.

System provides low-level capabilities that Context and Execution build on. Context can depend on System, but not vice versa.

### 3. Execution

The scheduler. How work gets planned and run.

- **workflows/** — 4 execution patterns: Routing, Orchestrator-Workers, Parallelization, Evaluator-Optimizer. Based on Anthropic's building blocks for agentic systems.
- **runs/** — Execution lifecycle. `Workflow.run()` returns `Run<Output>`. Controls: timeout, retry, cancel, approval. Human-in-the-loop lives here.

### 4. Apps

Distribution manifests. An "app" is a distribution of the Agentic OS — a `.md` file with YAML frontmatter declaring identity and provider bindings per protocol interface.

- **apps/** — App schema: `App`, `AppMetadata`, `ProviderEntry`, `ProviderMap`.

## Domain Layering

```
Apps (distribution manifests)
  └── references all domains below
Execution (workflows + runs)
  └── orchestrates the agent loop
Agent Loop (context → actions → checks)
  └── context depends on system
System (kernel)
  └── no upward dependencies
```

## Export Paths

```
@osprotocol/schema              # Everything
@osprotocol/schema/workflows    # Workflow patterns
@osprotocol/schema/runs         # Run control
@osprotocol/schema/system/*     # env, fs, sandbox, settings, preferences, registry, mcp-client, installer
@osprotocol/schema/context/*    # system, embeddings, kv
@osprotocol/schema/actions/*    # system, tools, mcp-servers
@osprotocol/schema/checks/*     # rules, judge, audit, screenshot
@osprotocol/schema/apps/schema  # App distribution manifest
```

## ProtocolDomain Type

```typescript
type ProtocolDomain = 'system' | 'context' | 'actions' | 'checks' | 'workflows' | 'runs'
```

Six domains. Note: there is no `'skills'` or `'apps'` domain in the type. Apps is a distribution concern, not a runtime domain.
