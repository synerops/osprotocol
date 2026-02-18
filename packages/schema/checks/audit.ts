/**
 * Audit
 *
 * @experimental No real implementation yet.
 *
 * Verification audit trail for recording check results.
 * The checks-phase interface for logging what was verified,
 * when, and with what outcome
 * (GitHub Audit Log, Datadog, Braintrust Logs,
 * LangSmith Traces).
 */

import type { RuleResult } from './rules'
import type { JudgeResult } from './judge'

/**
 * An audit log entry
 */
export interface AuditEntry {
  /** Unique identifier */
  id: string
  /** When this entry was created (Unix ms) */
  createdAt: number
  /** Agent that produced the verified content */
  agentId?: string
  /** Execution or run ID this audit belongs to */
  executionId?: string
  /** Rule evaluation results */
  ruleResults?: RuleResult[]
  /** Judge evaluation result */
  judgeResult?: JudgeResult
  /** Whether all checks passed */
  passed: boolean
  /** Extensible metadata for provider-specific data */
  metadata?: Record<string, unknown>
}

/**
 * Verification audit interface
 *
 * Provides logging and retrieval of check results.
 * Every verification (rules, judge) gets recorded
 * for compliance, debugging, and trust scoring.
 */
export interface Audit {
  /**
   * Log a verification result
   *
   * @param entry - Audit entry to record
   * @returns The recorded entry with generated ID
   */
  log(entry: Omit<AuditEntry, 'id' | 'createdAt'>): Promise<AuditEntry>

  /**
   * Get an audit entry by ID
   *
   * @param id - Audit entry identifier
   * @returns The entry, or null if not found
   */
  get(id: string): Promise<AuditEntry | null>

  /**
   * List audit entries for an execution
   *
   * @param executionId - Execution or run ID
   * @returns Array of audit entries
   */
  list(executionId: string): Promise<AuditEntry[]>
}
