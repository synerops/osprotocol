# Runs

Execution control for workflow runs. A Run wraps a Workflow execution with lifecycle management.

## Lifecycle

States: `pending → running → completed/failed/cancelled`. Can also be `paused` (via approval or manual pause).

`Workflow.run()` creates a Run in `pending` state. `Run.start()` begins execution.

## Controls

| Control | File | Purpose |
|---------|------|---------|
| Timeout | `timeout.ts` | Time limits. Actions on timeout: `fail` (default), `cancel`, `continue`. |
| Retry | `retry.ts` | Automatic retries. Configures: maxAttempts, delay, backoff (`fixed`/`exponential`/`linear`), retryable conditions. |
| Cancel | `cancel.ts` | Graceful cancellation with reason and cleanup callback. |
| Approval | `approval.ts` | Human-in-the-loop. Pauses execution until explicitly approved or rejected. |

## RunOptions

`RunOptions<Output>` combines all controls into a single configuration object passed to `Workflow.run()`. Each control is optional — use only what you need.

## Key Design Decisions

- Timeout and Cancel interact: timeout with `onTimeout: 'cancel'` triggers the cancel flow.
- Retry resets the timeout clock on each attempt.
- Approval can be triggered by check results (e.g., Judge score below threshold).
- Run persists state for recovery — a failed Run can be inspected and retried.
