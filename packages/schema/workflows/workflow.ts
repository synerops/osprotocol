/**
 * Base Workflow interface for the OS Protocol
 *
 * Workflows define execution patterns for agent tasks.
 * All workflow types extend this base interface.
 */

import type { Run, RunOptions } from '../runs/run'

/**
 * Base workflow interface that all workflow patterns must implement
 *
 * @template Output - The type of result produced by the workflow
 */
export interface Workflow<Output> {
  /**
   * Execute the workflow with the given prompt
   *
   * @param prompt - The input prompt/task to process
   * @param options - Optional run configuration (timeout, retry, cancel, etc.)
   * @returns Promise resolving to the workflow output
   */
  run(prompt: string, options?: RunOptions<Output>): Promise<Output>
}

/**
 * Type inference utility for extracting workflow output type
 */
export type InferWorkflowOutput<T> = T extends Workflow<infer Output>
  ? Output
  : never
