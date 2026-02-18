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

All interfaces added after the initial stable set (workflows, runs) are marked `@experimental`:

```typescript
/**
 * Sandbox
 *
 * @experimental No real implementation yet.
 *
 * Isolated execution environments for running agent workloads.
 */
```

The `@experimental` tag is removed only when:
1. At least one real implementation exists
2. The interface has been validated against real usage patterns

The stable set today: `Workflow`, `Run`, `Execution`, `Timeout`, `Retry`, `Cancel`, `Approval`, and the four workflow patterns (Routing, OrchestratorWorkers, Parallelization, EvaluatorOptimizer).

## Provider-Extensible Metadata

Every **entry type** (the data that travels through the system) includes `metadata?: Record<string, unknown>` for provider-specific extensions:

```typescript
// Entry types carry metadata — they travel through the system
interface EnvEntry<T = string> {
  key: string
  value: T
  metadata?: Record<string, unknown>  // Vercel: projectId, teamId
}

// Service interfaces do NOT carry metadata — they define behavior
interface Env {
  get(key: string): Promise<EnvEntry | null>
  // no metadata field here
}
```

**Entries travel; services are contracts.** A Vercel `EnvEntry` might carry `projectId` and `teamId`. A Cloudflare one might carry `workerId`. The protocol doesn't need to know — `metadata` absorbs it.

## Context/Actions Split

Each system capability owns both a Context and Actions interface in its own file:

```typescript
// system/env.ts owns both:
interface EnvContext { get, list }      // read-only
interface EnvActions { set, remove }   // write
```

The facades (`context/system.ts`, `actions/system.ts`) are pure composition — they import and aggregate, nothing more. Responsibility lives in each file, not in the facades.

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
