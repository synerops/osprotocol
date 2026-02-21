/**
 * Audit
 *
 * Schema and operations for verification audit trails.
 * Agents generate audit reports as files with YAML frontmatter
 * conforming to the AuditEntry schema.
 *
 * Aligned with ISO 27001 and ISACA/ITAF audit standards.
 */

import type { RuleResult } from './rules'
import type { JudgeResult } from './judge'

/**
 * ISACA expression of opinion
 *
 * @see ISACA/ITAF 4th Edition - Expression of Opinion
 */
export type AuditOpinion =
  /** No significant issues found, full compliance */
  | 'unqualified'
  /** Minor issues that don't affect overall compliance */
  | 'qualified'
  /** Significant issues, non-compliant */
  | 'adverse'
  /** Unable to form an opinion (insufficient evidence) */
  | 'disclaimer'

/**
 * Finding severity counts (ISO 27001)
 */
export interface AuditFindings {
  /** Immediate action required, severe risk */
  critical: number
  /** Should be addressed soon, significant impact */
  major: number
  /** Low risk, can be addressed in normal course */
  minor: number
}

/**
 * An audit entry
 *
 * Schema for audit report YAML frontmatter.
 * Aligned with ISO 27001 and ISACA/ITAF standards:
 * - objectives: ISACA "Objectives of the Audit"
 * - scope: ISO + ISACA "Scope of Engagement"
 * - opinion: ISACA "Expression of Opinion"
 * - findings: ISO "Non-Conformities" with severity counts
 */
export interface AuditEntry {
  /** Unique identifier */
  id: string

  /** When this entry was created (Unix ms) */
  createdAt: number

  /** Agent that performed the audit */
  agentId?: string

  /** Execution or run ID this audit belongs to */
  executionId?: string

  /**
   * Audit objectives (ISACA mandatory)
   * What the audit aims to determine
   */
  objectives: string

  /**
   * Audit scope
   * Files, systems, or processes being audited
   */
  scope: string[]

  /**
   * ISACA expression of opinion
   */
  opinion: AuditOpinion

  /**
   * Finding counts by severity (ISO 27001)
   */
  findings: AuditFindings

  /** Rule evaluation results (detail) */
  ruleResults?: RuleResult[]

  /** Judge evaluation result (detail) */
  judgeResult?: JudgeResult

  /** Extensible metadata for provider-specific data */
  metadata?: Record<string, unknown>
}

/**
 * Query pattern for filtering audit entries
 */
export interface AuditQuery {
  /** Filter by opinion type */
  opinion?: AuditOpinion | AuditOpinion[]
  /** Filter by minimum critical findings */
  minCritical?: number
  /** Filter by minimum major findings */
  minMajor?: number
  /** Filter by agent ID */
  agentId?: string
  /** Filter by execution ID */
  executionId?: string
  /** Filter by date range (Unix ms) */
  since?: number
  /** Filter by date range (Unix ms) */
  until?: number
}

/**
 * Audit operations interface
 *
 * Provides parsing, writing, and querying of audit entries.
 * Implementation determines storage location and format.
 */
export interface Audit {
  /**
   * Parse an audit entry from file content
   *
   * @param content - File content with YAML frontmatter
   * @returns Parsed audit entry
   */
  parse(content: string): AuditEntry

  /**
   * Generate file content from an audit entry
   *
   * @param entry - Audit entry to serialize
   * @param body - Markdown body content (Criteria, Findings, etc.)
   * @returns File content with YAML frontmatter
   */
  write(entry: Omit<AuditEntry, 'id' | 'createdAt'>, body: string): string

  /**
   * Query audit entries
   *
   * @param query - Filter criteria
   * @returns Matching audit entries
   */
  query(query: AuditQuery): Promise<AuditEntry[]>
}
