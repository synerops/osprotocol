/**
 * Human-in-the-Loop Approval
 *
 * Defines the approval interface for human oversight of workflow execution.
 */

/**
 * Result of an approval request
 */
export interface Approval {
  /** Whether the action was approved */
  approved: boolean
  /** Optional reason for the decision */
  reason?: string
  /** Identifier of who approved (user ID, email, etc.) */
  approvedBy?: string
  /** When the approval decision was made */
  timestamp: Date
}

/**
 * Configuration for approval requests
 */
export interface ApprovalConfig {
  /** Default timeout for approval requests (milliseconds) */
  timeoutMs?: number
  /** Whether to auto-approve after timeout */
  autoApproveOnTimeout?: boolean
  /** List of users who can approve */
  approvers?: string[]
  /** Minimum approvals required (for multi-approval scenarios) */
  requiredApprovals?: number
}

/**
 * Request for human approval
 */
export interface ApprovalRequest {
  /** Unique identifier for this request */
  id: string
  /** Message describing what needs approval */
  message: string
  /** Execution ID this request belongs to */
  executionId: string
  /** When the request was created */
  createdAt: Date
  /** When the request expires */
  expiresAt?: Date
  /** Current approval responses */
  responses: Approval[]
}
