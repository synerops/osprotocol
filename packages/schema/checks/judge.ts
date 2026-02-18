/**
 * Judge
 *
 * @experimental No real implementation yet.
 *
 * LLM-as-judge verification for evaluating agent output
 * against quality criteria. The checks-phase interface
 * for scoring and grading with reasoning
 * (OpenAI Evals, Braintrust Scorers, LangSmith
 * Evaluators, Arize Phoenix).
 */

import type { RuleResult } from './rules'

/**
 * Judge configuration
 */
export interface JudgeConfig {
  /** Model identifier for the judge LLM */
  model?: string
  /** Evaluation criteria or rubric */
  criteria: string
  /** Score threshold for passing (0-1) */
  threshold?: number
  /** Extensible metadata for provider-specific data */
  metadata?: Record<string, unknown>
}

/**
 * Judge evaluation result
 */
export interface JudgeResult {
  /** Score between 0 and 1 */
  score: number
  /** Whether the evaluation passed the threshold */
  passed: boolean
  /** LLM reasoning for the score */
  reasoning: string
  /** Optional breakdown by criteria */
  ruleResults?: RuleResult[]
  /** Extensible metadata for provider-specific data */
  metadata?: Record<string, unknown>
}

/**
 * LLM-as-judge evaluation interface
 *
 * Provides model-based evaluation of agent output.
 * Judges score content against criteria with reasoning.
 * Results feed into audit.ts and may trigger
 * runs/approval when below threshold.
 */
export interface Judge {
  /**
   * Evaluate content against criteria
   *
   * @param content - Content to evaluate
   * @param config - Judge configuration with criteria
   * @returns The evaluation result with score and reasoning
   */
  evaluate(content: unknown, config: JudgeConfig): Promise<JudgeResult>
}
