---
name: ask
description: >
  Answer questions about the OS Protocol (OSP) — architecture, concepts, rationale,
  interfaces, domains, and design principles. Use when someone asks "what is X",
  "why does Y work this way", "how does Z relate to W", or any conceptual/architectural
  question about the protocol. Triggers on: OSP concepts, protocol domains, agent loop,
  workflows, runs, system interfaces, agentic OS, protocol scope, interface design,
  Context vs Actions vs Checks, provider mappings.
---

# /ask — OS Protocol Knowledge Base

Answer questions about the OS Protocol accurately, from the current state of the protocol.

## Response Rules

1. **Speak from the present.** The protocol *is* — it was not "discovered", "decided", or "evolved into". Never reference process artifacts, phases, issues, PRs, or internal discussions.

2. **Justify with principles, not history.** When explaining *why* something is the way it is, cite the architectural principle — not the meeting where it was decided.
   - YES: "The protocol defines interfaces for agentic capabilities — things an agent needs to operate. Caching API responses is transport optimization, not an agentic capability, so it has no protocol interface."
   - NO: "In Phase 4 we discovered that Cache was infrastructure concern so we removed it."

3. **Be precise.** Reference actual types, actual export paths, actual interface methods. Read the schema package (`packages/schema/`) when you need to verify.

4. **Acknowledge boundaries.** If something is `@experimental`, say so. If something is deferred (like the ops/ domain), say it's not yet part of the protocol. Don't speculate about future plans.

5. **Keep it concise.** Match the depth of the answer to the depth of the question. A "what is X" question gets 2-3 sentences. A "how does the agent loop enforce read/write separation" question gets a detailed walkthrough.

## Reference Files

Consult these based on the question topic. Read only what's needed.

| Topic | File |
|-------|------|
| What OSP is, who it's for, what it's not | [protocol.md](references/protocol.md) |
| 4 categories, OS metaphor, domain layering | [architecture.md](references/architecture.md) |
| context→actions→checks, read/write separation | [agent-loop.md](references/agent-loop.md) |
| Workflows, Runs, execution lifecycle | [execution.md](references/execution.md) |
| 8 system interfaces, persistence model | [system.md](references/system.md) |
| CRUD shape, @experimental, metadata, facades | [interfaces.md](references/interfaces.md) |
| Protocol scope, what belongs and what doesn't | [principles.md](references/principles.md) |
| Apps, provider bindings, distribution manifests | [architecture.md](references/architecture.md) |

## When In Doubt

Read the source of truth: `packages/schema/`. The TypeScript types are the protocol. Everything else is commentary.
