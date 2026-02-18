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

Distribution manifests. An "app" is a distribution of the Agentic OS — a `.md` file with YAML frontmatter declaring identity and provider bindings per protocol interface. Think of it as `package.json` or `docker-compose.yml` for an agentic system.

- **apps/** — `App`, `AppMetadata`, `ProviderEntry`, `ProviderMap`. Import from `@osprotocol/schema/apps/schema`.

`ProviderMap` maps each protocol interface to a concrete vendor:

```yaml
providers:
  system:
    env: { provider: '@vercel/env' }
    sandbox: { provider: '@vercel/sandbox' }
  context:
    embeddings: { provider: '@upstash/vector' }
  checks:
    screenshot: { provider: 'playwright' }
```

Granularity is per individual interface, not per domain. A platform can mix vendors freely.

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

Each subpath is declared individually in `package.json` exports — no wildcards.

```
@osprotocol/schema                   # Everything (barrel)
@osprotocol/schema/workflows         # Workflow patterns
@osprotocol/schema/runs              # Run control
@osprotocol/schema/system/env        # Environment variables
@osprotocol/schema/system/fs         # Filesystem
@osprotocol/schema/system/sandbox    # Sandbox environments
@osprotocol/schema/system/settings   # System-wide settings
@osprotocol/schema/system/preferences # Scoped preferences
@osprotocol/schema/system/registry   # Resource registry
@osprotocol/schema/system/mcp-client # MCP client
@osprotocol/schema/system/installer  # Package installer
@osprotocol/schema/context/system    # Read-only system facade
@osprotocol/schema/context/embeddings # Embeddings
@osprotocol/schema/context/kv        # Key-value store
@osprotocol/schema/actions/system    # Write system facade
@osprotocol/schema/actions/tools     # Tool execution
@osprotocol/schema/actions/mcp-servers # MCP server communication
@osprotocol/schema/checks/rules      # Rules validation
@osprotocol/schema/checks/judge      # LLM-as-judge
@osprotocol/schema/checks/audit      # Audit trails
@osprotocol/schema/checks/screenshot # Visual verification
@osprotocol/schema/apps/schema       # App distribution manifest
```

## ProtocolDomain Type

```typescript
type ProtocolDomain = 'system' | 'context' | 'actions' | 'checks' | 'workflows' | 'runs'
```

Six domains. Note: there is no `'skills'` or `'apps'` domain in the type. Apps is a distribution concern, not a runtime domain.
