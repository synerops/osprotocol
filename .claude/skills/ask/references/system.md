# System Domain

The kernel. Platform environment, vendor-provided infrastructure. Static, not per-run.

System provides the low-level capabilities that Context and Execution build on top of. Context can depend on System, but not vice versa.

## 8 System Interfaces

All marked `@experimental`. Each follows the same pattern: an Entry type, a Context interface (read), an Actions interface (write), and a combined capability interface.

| Interface | Purpose | Providers |
|-----------|---------|-----------|
| `Env` | Platform environment variable management | Vercel, Cloudflare Workers, Railway |
| `Fs` | Host/platform filesystem operations | Vercel Blob, Cloudflare R2, AWS S3 |
| `Sandbox` | Isolated execution environments | Vercel Sandbox SDK, E2B |
| `Settings` | System-wide configuration | Platform-specific |
| `Preferences` | Scoped user/agent preferences | Platform-specific |
| `Registry` | Resource registration and discovery | A2A Agent Cards, npm, AGENTS.md |
| `McpClient` | MCP server connection management | Anthropic MCP |
| `Installer` | Package/dependency installation | npm, pip, apt |

### Env
CRUD for platform environment variables. Not `process.env` — this is for managing variables on the platform (create a `DATABASE_URL` for production, rotate an API key).

### Fs
Host/platform filesystem. Hierarchical, path-based access. Distinct from Sandbox (which has its own internal filesystem).

### Sandbox
Isolated execution environments for running agent workloads. Lifecycle management (create, stop), command execution, internal filesystem, networking, timeout. Cross-referenced from Vercel Sandbox SDK and E2B SDK.

### Registry
Generic `Registry<T>` — not agent-specific. Providers extend it for agents, skills, MCP servers, or any resource type. Compatible with A2A discovery patterns. CRUD operations: register, unregister, get, list, find.

Source: `packages/schema/system/registry.ts`

### McpClient
Infrastructure-level MCP support. Manages MCP server connections from the system side. Distinct from `actions/mcp-servers.ts` which is the agent-facing communication interface.

Two distinct MCP roles in the protocol:
- `system/mcp-client.ts` — infrastructure: the OS supports external MCP servers
- `actions/mcp-servers.ts` — agent communication: agents invoke MCP resources and prompts

## Agent Persistence Model

Agents have three distinct patterns for persisting data:

| Pattern | Interface | Access Model | Use Case |
|---------|-----------|-------------|----------|
| **fs** | `system/fs` | Hierarchical, path-based | Files, configs, artifacts |
| **kv** | `context/kv` | Flat, key-value | Structured data, direct access by known key |
| **embeddings** | `context/embeddings` | Semantic, similarity-based | Knowledge retrieval, RAG |

These three cover all agent data needs. There is no separate "memory" or "storage" primitive — those names carry cognitive or infrastructure bias. The protocol uses precise capability names instead.

## Facades

System capabilities are exposed to the agent loop via two facade interfaces:

- `SystemContext` (in `context/system.ts`) — composes all 8 read interfaces
- `SystemActions` (in `actions/system.ts`) — composes all 8 write interfaces

Facades are pure composition — no logic, no additional methods. Each system API owns its own Context and Actions interfaces; the facades just aggregate them.
