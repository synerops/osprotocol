---
"@osprotocol/schema": minor
---

Phase 4 checkpoint: breaking changes and new exports

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

**Removed from protocol:**
- `system/data/` (Cache, Storage, Data) — these are infrastructure concerns, not agentic capabilities. Extensions use them internally but the protocol should not define how implementations cache or persist data. Interfaces relocated to SDK as shared utilities.
- Export path `./system/data` removed

**Cleanup:**
- Deleted empty files: `context/documents.ts`, `context/memory.ts`, `context/apps.ts`
