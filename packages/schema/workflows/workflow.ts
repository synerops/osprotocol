/**
 * Base Workflow interface for the OS Protocol
 *
 * Workflows define execution patterns for agent tasks.
 * All workflow types extend this base interface.
 *
 * Workflows do not execute directly — instead, prepare()
 * creates a Run, and Run.start() begins execution (Q2).
 */

import type { Run, RunOptions } from '../runs/run'

/**
 * Base workflow interface that all workflow patterns must implement
 *
 * @template Output - The type of result produced by the workflow
 */
export interface Workflow<Output> {
  /**
   * Create a run for this workflow
   *
   * Returns a configured Run that can be started, inspected,
   * or further configured before execution begins.
   *
   * @param prompt - The input prompt/task to process
   * @param options - Optional run configuration (timeout, retry, cancel, etc.)
   * @returns Promise resolving to a configured Run
   */
  run(prompt: string, options?: RunOptions<Output>): Promise<Run<Output>>
}

/**
 * Type inference utility for extracting workflow output type
 */
export type InferWorkflowOutput<T> = T extends Workflow<infer Output>
  ? Output
  : never
