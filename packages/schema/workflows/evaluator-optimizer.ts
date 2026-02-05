/**
 * Evaluator-Optimizer Workflow Pattern
 *
 * Generates output, evaluates it against criteria, and iteratively optimizes
 * until quality thresholds are met.
 *
 * Pattern:
 *   Input → Generate → Evaluate → (if not good enough) → Optimize → Evaluate → ... → Output
 *
 * Use when:
 * - Quality is critical
 * - Initial outputs may not meet standards
 * - Iterative refinement is possible
 */

import type { Workflow } from './workflow'

/**
 * Evaluation result with score and feedback
 */
export interface Evaluation {
  /** Quality score (0.0 to 1.0) */
  score: number
  /** Whether the output meets the quality threshold */
  passed: boolean
  /** Feedback explaining the evaluation */
  feedback: string
  /** Specific criteria evaluations */
  criteria?: CriterionResult[]
}

/**
 * Result for a single evaluation criterion
 */
export interface CriterionResult {
  /** Name of the criterion */
  name: string
  /** Score for this criterion (0.0 to 1.0) */
  score: number
  /** Whether this criterion passed */
  passed: boolean
  /** Feedback for this criterion */
  feedback?: string
}

/**
 * Configuration for an evaluation criterion
 */
export interface EvaluationCriterion {
  /** Name of the criterion */
  name: string
  /** Description of what this criterion evaluates */
  description: string
  /** Minimum score required to pass (0.0 to 1.0) */
  threshold: number
  /** Weight of this criterion in overall score */
  weight?: number
}

/**
 * Evaluator-Optimizer workflow that generates, evaluates, and refines
 *
 * @template Output - The type of generated/optimized result
 */
export interface EvaluatorOptimizerWorkflow<Output> extends Workflow<Output> {
  /**
   * Generate initial output from the prompt
   *
   * @param prompt - The input prompt
   * @returns Promise resolving to the generated output
   */
  generate(prompt: string): Promise<Output>

  /**
   * Evaluate the output against quality criteria
   *
   * @param output - The output to evaluate
   * @param prompt - The original prompt (for context)
   * @returns Promise resolving to the evaluation result
   */
  evaluate(output: Output, prompt: string): Promise<Evaluation>

  /**
   * Optimize the output based on evaluation feedback
   *
   * @param output - The current output
   * @param evaluation - The evaluation with feedback
   * @param prompt - The original prompt
   * @returns Promise resolving to the optimized output
   */
  optimize(output: Output, evaluation: Evaluation, prompt: string): Promise<Output>
}

/**
 * Configuration for evaluator-optimizer workflow
 */
export interface EvaluatorOptimizerConfig {
  /** Minimum overall score to accept output (0.0 to 1.0) */
  threshold?: number
  /** Maximum optimization iterations before giving up */
  maxIterations?: number
  /** Evaluation criteria to apply */
  criteria?: EvaluationCriterion[]
  /** Model for generation */
  generatorModel?: string
  /** Model for evaluation (often a different model) */
  evaluatorModel?: string
}
