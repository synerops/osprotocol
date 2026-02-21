# @osprotocol/schema

## 0.2.3

### Patch Changes

- 76f5994: feat(checks): align AuditEntry with ISO 27001 / ISACA standards

  - Add `AuditOpinion` type for ISACA expression of opinion
  - Add `AuditFindings` for ISO 27001 severity counts
  - Add `AuditQuery` for filtering entries
  - Update `Audit` interface with parse/write/query operations

## 0.2.2

### Patch Changes

- 6e9d2dc: Fix release workflow to skip unnecessary build steps

## 0.2.1

### Patch Changes

- 05bc44e: Fix changesets workflow to automatically publish and create GitHub releases

## 0.2.0

### Minor Changes

- 5cfd74c: Phase 4 checkpoint: breaking changes and new exports

  **Breaking changes:**

  - `Workflow.run()` now returns `Run<Output>` instead of `Output` — workflows create a Run which is then started (decision Q2)
  - `Run<Output>` now has a `workflow` field linking it to its source Workflow
  - `ProtocolDomain` no longer includes `'skills'` — skills are an implementation concern, not protocol (decision Q4)
  - `skill.ts` removed — `ProtocolDomain` and `ProtocolReference` moved to main `index.ts`, `Tool` type canonical location is now `actions/tools.ts`
  - Export path `./skill` removed from package.json

  **New exports (all @experimental):**

  - `./system/env` — Environment variable management
  - `./system/fs` — File system operations
  - `./system/sandbox` — Isolated execution environments
  - `./system/settings` — Global system settings
  - `./system/preferences` — Per-agent/user preferences
  - `./system/registry` — Resource registration and discovery
  - `./system/mcp-client` — MCP server connection management
  - `./system/installer` — Package installation lifecycle
  - `./context/system` — Read-only system context facade
  - `./context/embeddings` — Vector embeddings and similarity search
  - `./actions/system` — System write operations facade
  - `./actions/tools` — Tool discovery and execution
  - `./actions/mcp-servers` — MCP server resources and prompts
  - `./checks/rules` — Declarative verification rules
  - `./checks/judge` — LLM-as-judge evaluation
  - `./checks/audit` — Verification audit trail
  - `./checks/screenshot` — Visual capture and comparison
  - `./apps/schema` — App distribution manifest

  **New interface:**

  - `./context/kv` — Key-value persistence for structured data (Cloudflare KV, Vercel KV, Deno KV, Upstash Redis). Distinct from fs (hierarchical) and embeddings (semantic). Includes KvContext (read) + KvActions (write) split.

  **Removed from protocol:**

  - `system/data/` (Cache, Storage, Data) — these are infrastructure concerns, not agentic capabilities. Extensions use them internally but the protocol should not define how implementations cache or persist data. Interfaces relocated to SDK as shared utilities.
  - Export path `./system/data` removed

  **Cleanup:**

  - Deleted empty files: `context/documents.ts`, `context/memory.ts`, `context/apps.ts`

## 0.1.0

### Minor Changes

- a80bbec: Initial public release of @osprotocol/schema.

  TypeScript type definitions for the Agentic OS Protocol:

  - Workflow patterns (Routing, Orchestrator-Workers, Parallelization, Evaluator-Optimizer)
  - Run control (Timeout, Retry, Cancel, Approval)
  - System data (Cache, Storage)
  - Agent and Skill schema definitions
