/**
 * Run and Execution interfaces
 *
 * Runs represent a single execution of a workflow with lifecycle control.
 * Executions provide runtime control over an active run.
 */

import type { Timeout } from './timeout'
import type { Retry } from './retry'
import type { Cancel } from './cancel'
import type { Approval } from './approval'

/**
 * Status of a workflow run
 */
export type RunStatus =
  | 'pending'
  | 'in-progress'
  | 'awaiting'
  | 'completed'
  | 'failed'
  | 'cancelled'

/**
 * Options for running a workflow
 *
 * @template Output - The type of result produced by the workflow
 */
export interface RunOptions<Output> {
  /** Timeout configuration */
  timeout?: Timeout
  /** Retry configuration */
  retry?: Retry
  /** Cancel configuration */
  cancel?: Cancel
  /** Callback when run completes successfully */
  onComplete?: (result: Output) => void
  /** Callback when run fails */
  onFailed?: (error: Error) => void
  /** Callback on each status change */
  onStatusChange?: (status: RunStatus) => void
}

/**
 * A configured workflow run (not yet started)
 *
 * @template Output - The type of result produced by the workflow
 */
export interface Run<Output> {
  /** Unique identifier for this run */
  id: string
  /** Current status of the run */
  status: RunStatus
  /** Run options */
  options: RunOptions<Output>
  /** Start the run and return an Execution handle */
  start(): Promise<Execution<Output>>
}

/**
 * Active execution handle for controlling a running workflow
 *
 * @template Output - The type of result produced by the workflow
 */
export interface Execution<Output> {
  /** Unique identifier for this execution */
  id: string
  /** Current status */
  status: RunStatus
  /** Progress information */
  progress: ExecutionProgress
  /** Execution logs */
  logs: string[]

  /**
   * Pause the execution (if supported)
   */
  pause(): Promise<void>

  /**
   * Resume a paused execution
   */
  resume(): Promise<void>

  /**
   * Cancel the execution
   *
   * @param reason - Optional reason for cancellation
   */
  cancel(reason?: string): Promise<void>

  /**
   * Request human approval before continuing
   *
   * @param message - Message to show to the approver
   * @returns Promise resolving to the approval result
   */
  waitForApproval(message?: string): Promise<Approval>

  /**
   * Request input from a human
   *
   * @template Input - The type of input expected
   * @param prompt - Prompt to show to the user
   * @returns Promise resolving to the user input
   */
  waitForInput<Input>(prompt: string): Promise<Input>

  /**
   * The final result of the execution (resolves when complete)
   */
  result: Promise<Output>
}

/**
 * Progress tracking for an execution
 */
export interface ExecutionProgress {
  /** Current step number */
  current: number
  /** Total number of steps (0 if unknown) */
  total: number
  /** Description of current step */
  message?: string
}
