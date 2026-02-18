# Interface Design Patterns

## CRUD as Default Shape

Most protocol interfaces follow a CRUD-like pattern because they model **platform capabilities that agents manage**. Environment variables, files, registry entries, preferences — these are all resources with lifecycle operations.

The typical shape:
- `get(key)` → read one
- `set(entry)` or `write(path, content)` → create or update
- `remove(key)` or `delete(key)` → delete
- `list(filter?)` → read many

Not every interface needs all four. Context interfaces are read-only (get, list, search). But when designing a new interface, CRUD is the starting point — then remove what doesn't have an agentic use case.

## @experimental Tag

All interfaces added after the initial stable set (workflows, runs) are marked `@experimental` in their JSDoc with the note "No real implementation yet."

The `@experimental` tag is removed only when:
1. At least one real implementation exists
2. The interface has been validated against real usage patterns

The stable set today: `Workflow`, `Run`, `Execution`, `Timeout`, `Retry`, `Cancel`, `Approval`, and the four workflow patterns (Routing, OrchestratorWorkers, Parallelization, EvaluatorOptimizer).

## Provider-Extensible Metadata

Every **entry type** (the data that travels through the system) includes `metadata?: Record<string, unknown>` for provider-specific extensions. Service interfaces do NOT carry metadata — they define behavior contracts.

**Entries travel; services are contracts.** A Vercel `EnvEntry` might carry `projectId` and `teamId`. A Cloudflare one might carry `workerId`. The protocol doesn't need to know — `metadata` absorbs it.

See any entry type in the schema (e.g., `packages/schema/system/env.ts` — `EnvEntry`) vs its service interface (`Env`) for this pattern.

## Context/Actions Split

Each system capability owns both a Context (read-only) and Actions (write) interface in its own file. The facades (`context/system.ts`, `actions/system.ts`) are pure composition — they import and aggregate, nothing more. Responsibility lives in each file, not in the facades.

See `packages/schema/system/env.ts` for an example: `EnvContext` (get, list) and `EnvActions` (set, remove) in the same file.

## Generics

- `Registry<T>` — generic over resource type
- `KvEntry<T>` — generic over value type
- `EmbeddingEntry<T>` — generic over metadata type
- `Workflow<Output>`, `Run<Output>`, `Execution<Output>` — generic over result type

Default generic parameters use `unknown` (not `any`) to maintain type safety.

## Async Everything

All interface methods return `Promise<T>`. The protocol is designed for distributed environments where every operation may cross a network boundary.

## No Runtime Code

The schema package is **types only**. No implementations, no runtime code, no compiled `.d.ts`. Just `.ts` files with type definitions. Implementations live in platform-specific packages.
