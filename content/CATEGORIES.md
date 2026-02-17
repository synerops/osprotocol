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
| context | `context/` | Memory, documents, embeddings — what the agent knows |
| actions | `actions/` | Tools, ops, MCP servers — what the agent can do |
| checks | `checks/` | Rules, audit, judge — how the agent verifies its work |

## 2. System

The kernel. Platform environment, vendor-provided infrastructure. Static, not per-run. (Q5)

Provides the low-level capabilities that Context and Execution build on top of. Context can depend on System, but not vice versa.

### Domains

| Domain | Directory | Description |
|---|---|---|
| system | `system/` | Environment, filesystem, registry, data (cache/storage), MCP client |

## 3. Execution

The scheduler. How work gets planned and run.

- **Workflows** define patterns (routing, orchestrator-workers, parallelization, evaluator-optimizer).
- **Runs** execute them. `Workflow.prepare()` + `Run.start()` → `Execution`. (Q2)
- Human-in-the-loop lives here (approval, cancel, timeout, retry).

### Domains

| Domain | Directory | Description |
|---|---|---|
| workflows | `workflows/` | 4 execution patterns based on Anthropic's building blocks |
| runs | `runs/` | Run lifecycle, timeout, retry, cancel, approval |

## 4. Definition

The actors. How agents and skills are defined and discovered.

- **Agent** — Primary actor, defined in `AGENT.md` files with YAML frontmatter.
- **Skill** — Capabilities/APIs, defined in `SKILL.md` files.

### Files

| File | Description |
|---|---|
| `agent.ts` | Agent, AgentMetadata, AgentAnnotations, AgentRegistryEntry |
| `skill.ts` | Skill, SkillMetadata, Tool, ProtocolDomain, LoadedSkill |

---

## Tracking

- **TBD files** (agent.ts, skill.ts, scripts/): issue #36
- **Extension files** (13 interface drafts): issue #38
- **Aspirational files** (9 decisions): issue #39
- **Noise files**: all deleted
