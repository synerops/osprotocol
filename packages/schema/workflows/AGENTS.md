# Workflows

Execution patterns for coordinating agent tasks. Based on Anthropic's "Building Effective Agents" patterns.

## Base Interface

All workflow types extend `Workflow<Output>` (in `workflow.ts`):
- Single method: `run(prompt, options?) → Promise<Run<Output>>`
- Returns a configured `Run` that can be started, inspected, or further configured before execution.
- `InferWorkflowOutput<T>` extracts the output type from any workflow.

## Patterns

| Pattern | File | Flow | Use when |
|---------|------|------|----------|
| Routing | `routing.ts` | classify → delegate to one workflow | Input needs classification before processing |
| Orchestrator-Workers | `orchestrator-workers.ts` | plan → delegate to workers → synthesize | Task requires multiple specialized capabilities |
| Parallelization | `parallelization.ts` | split → parallel execute → merge | Independent subtasks, speed matters |
| Evaluator-Optimizer | `evaluator-optimizer.ts` | generate → evaluate → optimize (loop) | Quality is critical, iterative refinement possible |

## Composability

Workflows compose naturally. A worker in Orchestrator-Workers can itself be a Routing workflow. A Parallelization task can contain Evaluator-Optimizer subtasks. The `Workflow<Output>` interface makes this possible — any pattern is just a `Workflow`.

## Key Design Decisions

- Routing is the simplest — classifies and delegates to ONE workflow, no aggregation.
- Orchestrator-Workers has `PlanStep.dependsOn` for expressing step dependencies.
- Parallelization has `failureStrategy`: `'fail-fast'` stops on first error, `'collect-all'` runs everything.
- Evaluator-Optimizer supports separate `generatorModel` and `evaluatorModel` — different models for generation and evaluation.
- Config types (e.g., `RoutingWorkflowConfig`, `ParallelizationConfig`) are separate from the workflow interfaces.
