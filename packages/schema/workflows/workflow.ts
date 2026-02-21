/**
 * Base Workflow interface for the OS Protocol
 *
 * Workflows define execution patterns for agent tasks.
 * All workflow types extend this base interface.
 *
 * Creating a run IS starting it — workflow.run() returns an active
 * Execution handle directly. This aligns with ACP (Agent Communication
 * Protocol) where creating a resource activates it immediately.
 */

import type { Execution, RunOptions } from '../runs/run'

/**
 * Base workflow interface that all workflow patterns must implement
 *
 * @template Output - The type of result produced by the workflow
 */
export interface Workflow<Output> {
  /**
   * Run a workflow and return an active execution
   *
   * Creating a run IS starting it. The execution begins immediately
   * and the returned Execution handle provides runtime control.
   *
   * @param prompt - The input prompt/task to process
   * @param options - Optional run configuration (timeout, retry, cancel, etc.)
   * @returns Promise resolving to an active Execution
   */
  run(prompt: string, options?: RunOptions<Output>): Promise<Execution<Output>>
}

/**
 * Type inference utility for extracting workflow output type
 */
export type InferWorkflowOutput<T> = T extends Workflow<infer Output>
  ? Output
  : never
