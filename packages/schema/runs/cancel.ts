/**
 * Cancel Configuration
 *
 * Defines how to handle workflow cancellation.
 */

/**
 * Cancel configuration for workflow runs
 */
export interface Cancel {
  /**
   * Called before cancellation proceeds
   * Return false to prevent cancellation
   */
  beforeCancel?: () => boolean | Promise<boolean>

  /**
   * Called after cancellation completes
   */
  afterCancel?: () => void

  /**
   * Optional reason for cancellation
   */
  reason?: string

  /**
   * Whether to wait for cleanup before resolving
   */
  graceful?: boolean

  /**
   * Timeout for graceful cancellation in milliseconds
   */
  gracefulTimeoutMs?: number
}
