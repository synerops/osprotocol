# Execution: Workflows and Runs

## Core Relationship

**Workflows define patterns. Runs execute them.**

`Workflow.run()` returns a `Run<Output>` — a configured execution that can be started, inspected, or further configured before it begins. `Run.start()` returns an `Execution<Output>` handle for runtime control.

For exact type definitions, read:
- `packages/schema/workflows/workflow.ts` — `Workflow<Output>`, `InferWorkflowOutput`
- `packages/schema/runs/run.ts` — `Run<Output>`, `RunStatus`, `RunOptions`, `Execution`, `ExecutionProgress`

## Workflow Patterns

Four execution patterns based on Anthropic's building blocks for agentic systems:

### Routing
Classify inputs and delegate to specialized agents. A single entry point fans out to the right handler. Key method: `classify(prompt)` returns a route key (string).

Source: `packages/schema/workflows/routing.ts`

### Orchestrator-Workers
Plan, delegate subtasks to workers, synthesize results. Three-step flow: `plan()` → `delegate()` per step → `synthesize()` all results with the original plan.

Source: `packages/schema/workflows/orchestrator-workers.ts`

### Parallelization
Split work into independent subtasks, execute in parallel, merge results. Three-step flow: `split()` → `parallel()` → `merge()`.

Source: `packages/schema/workflows/parallelization.ts`

### Evaluator-Optimizer
Generate-evaluate-refine loop until quality thresholds are met. Three methods: `generate()` → `evaluate()` → `optimize()`, all receiving the original prompt for context.

Source: `packages/schema/workflows/evaluator-optimizer.ts`

## Run Lifecycle

```
pending → in-progress → completed
                      → failed
                      → cancelled
         → awaiting (human-in-the-loop)
```

### Run Controls

All controls are optional configuration on `RunOptions`:

| Control | Type | Purpose |
|---------|------|---------|
| `timeout` | `Timeout` | Max duration. Actions: `fail`, `cancel`, or `continue`. |
| `retry` | `Retry` | Retry on failure. Backoff strategies: `fixed`, `exponential`, `linear`. |
| `cancel` | `Cancel` | Cancellation configuration. |
| `approval` | (via `Execution.waitForApproval()`) | Human-in-the-loop before critical actions. |

Sources: `packages/schema/runs/timeout.ts`, `runs/retry.ts`, `runs/cancel.ts`, `runs/approval.ts`

### Execution Handle

Once a Run starts, the `Execution<Output>` handle provides runtime control: pause/resume, cancel, request human approval or input, and a result promise.

Source: `packages/schema/runs/run.ts` — see the `Execution<Output>` interface.

## Human-in-the-Loop

Human-in-the-loop lives in Execution, not in the Agent Loop. The agent loop is cognitive (gather-act-verify); human interaction is an execution concern (pause the run, wait for approval, resume).

An agent can call `execution.waitForApproval(message)` to pause and await human decision, or `execution.waitForInput<T>(prompt)` to request structured input.

Source: `packages/schema/runs/approval.ts` — `Approval`, `ApprovalConfig`, `ApprovalRequest`
