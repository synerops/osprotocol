/**
 * Verification Rules
 *
 * @experimental No real implementation yet.
 *
 * Declarative verification criteria for agent output.
 * The checks-phase interface for defining what must be
 * satisfied before output is accepted
 * (ESLint Rules, GitHub Checks, Vercel Deployment
 * Checks, OpenAI Guardrails).
 */

/**
 * Rule severity level
 */
export type RuleSeverity = 'error' | 'warning' | 'info'

/**
 * Rule evaluation result
 */
export interface RuleResult {
  /** Rule that was evaluated */
  ruleName: string
  /** Whether the rule passed */
  passed: boolean
  /** Severity of this rule */
  severity: RuleSeverity
  /** Human-readable message explaining the result */
  message: string
  /** Extensible metadata for provider-specific data */
  metadata?: Record<string, unknown>
}

/**
 * A verification rule definition
 */
export interface Rule {
  /** Rule name */
  name: string
  /** Human-readable description */
  description: string
  /** Severity level */
  severity: RuleSeverity
  /** Evaluate this rule against content */
  evaluate(content: unknown): Promise<RuleResult>
  /** Extensible metadata for provider-specific data */
  metadata?: Record<string, unknown>
}

/**
 * Verification rules management interface
 *
 * Provides declarative verification criteria that agent
 * output must satisfy. Rules are composable and can be
 * evaluated individually or as a set. Results feed into
 * audit.ts and may trigger runs/approval.
 */
export interface Rules {
  /**
   * Get a rule by name
   *
   * @param name - Rule name
   * @returns The rule, or null if not found
   */
  get(name: string): Promise<Rule | null>

  /**
   * List all available rules
   *
   * @returns Array of all rules
   */
  list(): Promise<Rule[]>

  /**
   * Evaluate all rules against content
   *
   * @param content - Content to verify
   * @returns Array of results for each rule
   */
  evaluate(content: unknown): Promise<RuleResult[]>
}
