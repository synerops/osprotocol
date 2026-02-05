/**
 * Retry Configuration
 *
 * Defines how to handle retries on workflow failures.
 */

/**
 * Backoff strategy for retries
 */
export type Backoff = 'none' | 'linear' | 'exponential'

/**
 * Retry configuration for workflow runs
 */
export interface Retry {
  /** Maximum number of retry attempts */
  attempts: number
  /** Initial delay between retries in milliseconds */
  delayMs: number
  /** Backoff strategy (default: 'none') */
  backoff?: Backoff
  /** Maximum delay when using backoff (milliseconds) */
  maxDelayMs?: number
  /** Callback on each retry attempt */
  onRetry?: (error: Error, attempt: number) => void
  /** Optional predicate to determine if error is retryable */
  shouldRetry?: (error: Error) => boolean
}
