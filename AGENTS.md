# OS Protocol: Knowledge Base

## Protocol Nature (1-10)
1. OSP is a specification, not a framework or library.
2. The protocol defines TypeScript interfaces for orchestrating agents.
3. OSP is the contract you implement, not the code you run.
4. Like HTTP enables browsers to talk to servers, OSP enables agents to collaborate.
5. The protocol defines what must be supported, not how you must build it.
6. Different teams can implement OSP in different languages and maintain compatibility.
7. OSP allows partial conformance: implement the domains you need.
8. The specification is modular: System, Context, Actions, Checks, Workflows, Runs.
9. All post-initial interfaces are marked `@experimental` — the API surface may change.
10. The `@osprotocol/schema` package publishes `.ts` files directly (types-only, no compiled output).

## The Agentic OS Concept (11-20)
11. An Agentic OS is backend infrastructure for agents, not a graphical interface for humans.
12. The LLM functions conceptually as the system's Kernel.
13. In an Agentic OS, the operating system user is the agent, not just the human.
14. Agents request resources from the OS: environment variables, files, tools, sandboxes.
15. The OS manages cognitive resources: inference, context window, vector stores, tools.
16. Context Window is the equivalent of RAM in traditional systems.
17. Vector stores (Embeddings) are the semantic search layer.
18. Tools and MCP are the device drivers of the Agentic OS.
19. An Agentic OS solves orchestration complexity, not just user experience.
20. The protocol focuses on what agents need — infrastructure concerns like caching are left to providers.

## System Domain (21-30)

```
packages/schema/system/
├── env.ts          # Environment variables (Vercel, Cloudflare Workers, Railway)
├── fs.ts           # File system (local disk, S3, Vercel Blob, Cloudflare R2)
├── sandbox.ts      # Isolated execution (Vercel Sandbox, E2B, Docker)
├── settings.ts     # Global platform settings (Vercel Project Settings, AWS SSM)
├── preferences.ts  # Scoped per-agent/per-user config (VS Code Settings, Claude Code Config)
├── registry.ts     # Resource registration and discovery (A2A Agent Cards, npm Registry)
├── installer.ts    # Package management (npm, pip, Claude Code Skills, Homebrew)
└── mcp-client.ts   # MCP server connections (Claude Code MCP, Cursor MCP)
```

21. System interfaces are the kernel — infrastructure that all agents depend on.
22. Each interface follows a consistent pattern: Entry type, Context, Actions, full interface.
23. Entry types carry `metadata?: Record<string, unknown>` for provider-specific data.
24. Settings are system-wide (all agents). Preferences are scoped (agent > user > system cascade).
25. Registry is generic (`Registry<T>`) — works for agents, skills, MCP servers, or any resource.
26. RegistryContext/Actions use named registries (e.g., `get("agents", "my-agent")`).
27. Sandbox manages isolated execution environments with their own filesystem and commands.
28. MCP Client is infrastructure-level (connections). Agent-facing MCP access is in actions/mcp-servers.
29. Installer is the kernel's package manager — installs capabilities at runtime.
30. Filesystem operates on the host platform. Sandbox has its own internal filesystem.

## Context and Actions: The Agent Loop Split (31-40)

```
Agent Loop:
  1. Context phase (gather) — read-only observation
  2. Actions phase (act)   — write operations
  3. Checks phase (verify) — quality verification
  4. Iterate
```

31. Every system interface splits into a read-only Context and a write Actions facade.
32. SystemContext composes all Context interfaces into a single read entry point.
33. SystemActions composes all Actions interfaces into a single write entry point.
34. The split enforces zero-trust: agents observe before mutating.
35. Context interfaces: EnvContext, FsContext, SettingsContext, PreferencesContext, RegistryContext, SandboxContext, InstallerContext, McpContext.
36. Actions interfaces: EnvActions, FsActions, SettingsActions, PreferencesActions, RegistryActions, SandboxActions, InstallerActions, McpActions.
37. Embeddings (context/embeddings) provides semantic search — search by meaning, not keywords.
38. KV (context/kv) provides key-value persistence for the agent loop.
39. Tools (actions/tools) is the unified interface for invoking tools from any source.
40. McpServers (actions/mcp-servers) provides agent-facing access to MCP resources and prompts.

## Checks Domain (41-50)
41. Checks verify agent output quality before acceptance.
42. Rules are declarative verification criteria (like ESLint, GitHub Checks, OpenAI Guardrails).
43. Rules have severity levels: error (blocks), warning (flags), info (notes).
44. Judge is LLM-as-judge evaluation — scores output 0-1 with reasoning.
45. Judge can use a different model than the generator (evaluatorModel vs generatorModel).
46. Screenshot captures visual state and compares against baselines for regression detection.
47. ComparisonResult follows the same passed/message pattern as RuleResult.
48. Audit logs every verification result for compliance, debugging, and trust scoring.
49. AuditEntry aggregates RuleResult[] and JudgeResult for a complete check record.
50. Check results can trigger Approval (human-in-the-loop) when below threshold.

## Workflows: Execution Patterns (51-60)
51. Workflows are proven patterns for coordinating agent execution.
52. All workflow types extend `Workflow<Output>` which has a single method: `run(prompt, options?)`.
53. `run()` returns a `Run<Output>` — configured but not yet executing.
54. OSP adapts Anthropic's patterns: Routing, Orchestrator-Workers, Parallelization, Evaluator-Optimizer.
55. Routing classifies input and delegates to a single specialized workflow.
56. Orchestrator-Workers plans, delegates to workers, and synthesizes results.
57. Parallelization splits into independent subtasks, runs them concurrently, merges results.
58. Evaluator-Optimizer generates, evaluates, and iteratively refines until quality criteria are met.
59. Workflows are composable: a worker in Orchestrator-Workers can itself be a Routing workflow.
60. Workflows are patterns first; implementations materialize them with specific providers.

## Runs: Execution Control (61-70)
61. Run is the primary controllable unit of execution in the protocol.
62. A Run wraps a Workflow execution with lifecycle controls.
63. Run has states: pending, running, paused, completed, failed, cancelled.
64. Timeout controls execution duration with configurable actions: fail, cancel, or continue.
65. Retry defines automatic retry behavior: maxAttempts, delay, backoff strategy, retryable conditions.
66. Cancel provides graceful cancellation with cleanup callbacks.
67. Approval enables human-in-the-loop: pause execution and wait for explicit approval.
68. RunOptions combines timeout, retry, cancel, and approval configuration.
69. Runs persist their state to enable recovery from failures.
70. The hierarchy: Workflow.run() → Run → start/pause/cancel/resume.

## Apps: Distribution Manifests (71-80)
71. An App is a distribution of the Agentic OS — a complete system configuration.
72. Apps declare which vendors implement which protocol interfaces.
73. The manifest format is YAML frontmatter + free-form markdown body.
74. The filename is author's choice (SYNER.md, APP.md, etc.) — the format is what matters.
75. ProviderMap maps protocol domains to concrete provider packages per interface.
76. Granularity is per individual interface, not per domain.
77. AppMetadata includes name, version, description, minimum protocol version, and providers.
78. The markdown body is free-form documentation: instructions, architecture notes, onboarding.
79. Cross-references: package.json, Docker Compose, Helm Chart.yaml, vercel.json.
80. Apps enable comparing and sharing complete agentic system configurations.

## Design Principles (81-90)
81. If the protocol doesn't define a type for it, the protocol doesn't standardize it.
82. Agent/skill definition (AGENT.md, SKILL.md) is a platform concern, not protocol concern.
83. Infrastructure concerns (caching, storage) are left to providers, not the protocol.
84. Every interface should have a clear real-world analogue (provider examples in JSDoc).
85. The Context/Actions split is non-negotiable — read before write.
86. Composition over inheritance: SystemContext composes interfaces, not extends them.
87. Generic types (`Registry<T>`, `EnvEntry<T>`) enable type-safe provider implementations.
88. `metadata?: Record<string, unknown>` on every Entry type enables provider extensibility.
89. Evaluate elimination before rewriting — ask "should this exist?" before "how to improve?"
90. The protocol is the floor, not the ceiling — providers can add capabilities beyond what OSP defines.
