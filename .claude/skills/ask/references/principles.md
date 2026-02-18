# Protocol Principles

## The Protocol Scope Principle

> The protocol defines interfaces for agentic capabilities — things an agent needs to operate. Only parts of a service that enable agentic capabilities should have protocol interfaces.

This is the core criterion for what belongs in the protocol and what doesn't. It distinguishes protocol from infrastructure.

### Applying the Principle

**Ask**: "Does an agent need this capability to operate as an agent?"

- **Semantic search over knowledge** → Yes. An agent needs to find relevant context by meaning. → `context/embeddings` belongs.
- **Caching API responses** → No. That's transport optimization. The agent doesn't think about caching; the infrastructure handles it. → No protocol interface.
- **Isolated code execution** → Yes. An agent that writes and runs code needs a sandbox. → `system/sandbox` belongs.
- **Key-value persistence** → Yes. An agent needs to store and retrieve structured data. → `context/kv` belongs.
- **Rate limiting** → No. That's infrastructure policy. The agent doesn't manage its own rate limits. → No protocol interface.

### What Doesn't Belong

- **Infrastructure concerns**: caching, CDN, load balancing, connection pooling, rate limiting, durable storage backends. These are transport/infrastructure optimization, not agentic capabilities. Example: an HTTP cache using ETags for GitHub API responses is system→user optimization — the agent doesn't think about caching, the infrastructure handles it. The protocol had `Cache` and `Storage` interfaces that were removed for this reason.
- **Platform implementation details**: how a provider stores data internally, what database they use, their deployment architecture.
- **Agent definition**: how an agent declares itself (name, capabilities, metadata). This is a platform concern — each platform defines its own agent format. The protocol provides `Registry<T>` for discovery, but the `T` is up to the platform.
- **Skill definition**: how capabilities are packaged. This is also a platform concern. The protocol provides `Tools` and `McpServers` for capability execution, but skill packaging is implementation-specific.

## The OS Metaphor Is Structural

The OS metaphor is not a teaching aid — it's the decision framework. When evaluating whether something belongs in the protocol or where it should go:

- **Kernel concern?** → `system/` (static infrastructure, vendor-provided)
- **User-space concern?** → `context/` or `actions/` (agent-facing, per-run)
- **Scheduler concern?** → `workflows/` and `runs/` (execution orchestration)
- **Verification concern?** → `checks/` (the agent loop's verify step)
- **Operations concern?** → Not in the protocol today. Observability (tracing, errors, metrics) is deferred as a potential future `ops/` domain.

## Implicit Over Explicit

The Agent Loop has no dedicated type. The three domains (context, actions, checks) enforce the pattern through their interfaces. This is deliberate:

- Implicit composition is more flexible than a rigid orchestration type
- Domains can evolve independently without breaking a central `AgentLoop` interface
- Planning is a workflow concern (Orchestrator-Workers), not a loop phase

## Types Over Runtime

The protocol is a **specification expressed as TypeScript types**. No runtime code, no implementations, no side effects. Types are the contract. Implementations honor the contract. This enables:

- Cross-language portability (types can be transpiled to JSON Schema for non-TypeScript consumers)
- No vendor lock-in at the protocol level
- Clear separation between "what" (protocol) and "how" (implementation)

The protocol publishes JSON Schemas at `osprotocol.dev/v1/` for cross-language validation — 32 schemas covering all interfaces, generated at build time from the TypeScript types.
