# OS Protocol Categories

The protocol is organized into 4 categories derived from the OS metaphor (Phase 1, Q4/Q9).

## 1. Agent Loop

The process cycle. How an agent perceives, acts, and verifies.

Three domains compose the loop implicitly (no dedicated AgentLoop type):

```
context → actions → checks (verification)
```

- **Context** — Agent-consumed information. Dynamic, per-run. Built on top of System but exposes agent-oriented interfaces. (Q5)
- **Actions** — What the agent can do. Tool execution, operations, MCP server communication. (Q8)
- **Checks** — Verification phase. Presents results, can trigger approval requests via runs/approval. (Q6)

### Domains

| Domain | Directory | Description |
|---|---|---|
| context | `context/` | Embeddings, key-value persistence — what the agent knows |
| actions | `actions/` | Tools, MCP servers — what the agent can do |
| checks | `checks/` | Rules, audit, judge, screenshot — how the agent verifies its work |

## 2. System

The kernel. Platform environment, vendor-provided infrastructure. Static, not per-run. (Q5)

Provides the low-level capabilities that Context and Execution build on top of. Context can depend on System, but not vice versa.

### Domains

| Domain | Directory | Description |
|---|---|---|
| system | `system/` | Environment, filesystem, sandbox, settings, preferences, registry, MCP client, installer |

## 3. Execution

The scheduler. How work gets planned and run.

- **Workflows** define patterns (routing, orchestrator-workers, parallelization, evaluator-optimizer).
- **Runs** execute them. `Workflow.run()` returns `Run<Output>`. (Q2, P4)
- Human-in-the-loop lives here (approval, cancel, timeout, retry).

### Domains

| Domain | Directory | Description |
|---|---|---|
| workflows | `workflows/` | 4 execution patterns based on Anthropic's building blocks |
| runs | `runs/` | Run lifecycle, timeout, retry, cancel, approval |

## 4. Apps

Distribution manifests. How agentic OS distributions are defined.

An "app" is a distribution of the Agentic OS — a `.md` file with YAML frontmatter declaring identity and provider bindings per protocol interface.

### Files

| File | Description |
|---|---|
| `apps/schema.ts` | App, AppMetadata, ProviderEntry, ProviderMap |

---

## Removed from protocol

| File | Reason | Phase |
|---|---|---|
| `agent.ts` | Platform concern, not protocol. `Registry<T>` covers discovery. | P5 |
| `skill.ts` | Platform concern. `Tool` canonical in `actions/tools.ts`. | P4 |
| `system/data/` (cache, storage) | Infrastructure concern, not agentic capability. | P4 |
| `skills/` (orchestrator, planner, executor) | Implementation concern (Syner OS). | P2 |
| `system/agents.json` | Deprecated by `apps/schema.ts`. | P5 |

---

## Tracking

- All Noise files removed (Phases 2–5)
- 18 @experimental interfaces drafted (Phase 3, issue #38)
- All pending decisions applied (Phase 4, issue #42)
- Structure review complete (Phase 5, issue #45)
