/**
 * Timeout Configuration
 *
 * Defines how to handle workflow execution timeouts.
 */

/**
 * Action to take when a timeout occurs
 */
export type TimeoutAction = 'fail' | 'cancel' | 'continue'

/**
 * Timeout configuration for workflow runs
 */
export interface Timeout {
  /** Timeout duration in milliseconds */
  ms: number
  /** Action to take when timeout occurs (default: 'fail') */
  onTimeout?: TimeoutAction
  /** Callback function when timeout occurs */
  onTimeoutCallback?: () => void
}
