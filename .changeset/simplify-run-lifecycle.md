---
"@osprotocol/schema": patch
---

Simplify Run lifecycle: remove `Run` interface, align with ACP

**Breaking Change:** `Workflow.run()` now returns `Promise<Execution<Output>>` directly instead of `Promise<Run<Output>>`.

Before:
```typescript
const run = await workflow.run(prompt)
const exec = await run.start()
const result = await exec.result
```

After:
```typescript
const exec = await workflow.run(prompt)
const result = await exec.result
```

Changes:
- Remove `Run` interface from public exports
- `Workflow.run()` returns `Execution` directly
- Aligns with [ACP Run Lifecycle](https://agentcommunicationprotocol.dev/core-concepts/agent-run-lifecycle)

Closes #60
