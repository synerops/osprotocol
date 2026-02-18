# Execution: Workflows and Runs

## Core Relationship

**Workflows define patterns. Runs execute them.**

```typescript
// Workflow defines the pattern
interface Workflow<Output> {
  run(prompt: string, options?: RunOptions<Output>): Promise<Run<Output>>
}

// Run is the execution unit
interface Run<Output> {
  id: string
  status: RunStatus
  workflow: Workflow<Output>    // back-reference to its workflow
  options: RunOptions<Output>
  start(): Promise<Execution<Output>>
}
```

`Workflow.run()` returns a `Run<Output>` — a configured execution that can be started, inspected, or further configured before it begins. `Run.start()` returns an `Execution<Output>` handle for runtime control.

## Workflow Patterns

Four execution patterns based on Anthropic's building blocks for agentic systems:

### Routing
Classify inputs and delegate to specialized agents. A single entry point fans out to the right handler.

```typescript
interface RoutingWorkflow<Output> extends Workflow<Output> {
  classify(prompt: string): Promise<string>  // returns route key
}
```

### Orchestrator-Workers
Plan, delegate subtasks to workers, synthesize results. The orchestrator creates a plan, distributes work, and combines outputs.

```typescript
interface OrchestratorWorkersWorkflow<Output> extends Workflow<Output> {
  plan(prompt: string): Promise<Plan>
  delegate(step: PlanStep): Promise<WorkerResult>
  synthesize(results: WorkerResult[], plan: Plan): Promise<Output>
}
```

### Parallelization
Split work into independent subtasks, execute in parallel, merge results.

```typescript
interface ParallelizationWorkflow<Output> extends Workflow<Output> {
  split(prompt: string): Promise<Subtask[]>
  parallel(subtasks: Subtask[]): Promise<SubtaskResult[]>
  merge(results: SubtaskResult[]): Promise<Output>
}
```

### Evaluator-Optimizer
Generate output, evaluate against criteria, refine iteratively until quality thresholds are met.

```typescript
interface EvaluatorOptimizerWorkflow<Output> extends Workflow<Output> {
  generate(prompt: string): Promise<Output>
  evaluate(output: Output, prompt: string): Promise<Evaluation>
  optimize(output: Output, evaluation: Evaluation, prompt: string): Promise<Output>
}
```

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
| `timeout` | `Timeout` | Max duration. Actions: `fail`, `cancel`, or `notify`. |
| `retry` | `Retry` | Retry on failure. Backoff strategies: `fixed`, `exponential`, `linear`. |
| `cancel` | `Cancel` | Cancellation configuration. |
| `approval` | (via `Execution.waitForApproval()`) | Human-in-the-loop before critical actions. |

### Execution Handle

Once a Run starts, the `Execution<Output>` handle provides runtime control:

- `pause()` / `resume()` — suspend and resume
- `cancel(reason?)` — abort execution
- `waitForApproval(message?)` — request human approval
- `waitForInput<T>(prompt)` — request human input
- `result` — promise that resolves with the final output

## Human-in-the-Loop

Human-in-the-loop lives in Execution, not in the Agent Loop. The agent loop is cognitive (gather-act-verify); human interaction is an execution concern (pause the run, wait for approval, resume).

```typescript
// During execution, an agent can request approval
const approval = await execution.waitForApproval('Deploy to production?')

// Or request input
const config = await execution.waitForInput<DeployConfig>('Select deployment target')
```

The `Approval` type defines the approval configuration:

```typescript
interface Approval {
  status: 'approved' | 'rejected' | 'expired'
  approver?: string
  message?: string
}
```
