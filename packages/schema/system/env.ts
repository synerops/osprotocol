/**
 * Environment Variables
 *
 * @experimental No real implementation yet.
 *
 * Platform-level management of environment variables.
 * The kernel interface for creating, reading, updating,
 * and removing configuration variables in the execution
 * environment (Vercel, Cloudflare Workers, Railway).
 */

/**
 * An environment variable entry
 *
 * @template T - The type of the variable value (typically string)
 */
export interface EnvEntry<T = string> {
  /** Variable name */
  key: string
  /** Variable value */
  value: T
  /** Target environment(s) this variable applies to */
  target?: string[]
  /** Whether this variable contains sensitive data */
  sensitive?: boolean
  /** Extensible metadata for provider-specific data */
  metadata?: Record<string, unknown>
}

/**
 * Read-only environment context for the agent loop
 */
export interface EnvContext {
  /** Get an environment variable */
  get(key: string): Promise<EnvEntry | null>
  /** List all environment variables (sensitive values may be masked) */
  list(): Promise<EnvEntry[]>
}

/**
 * Environment write operations for the agent loop
 */
export interface EnvActions {
  /** Set an environment variable (create or update) */
  set(entry: Omit<EnvEntry, 'metadata'>): Promise<EnvEntry>
  /** Remove an environment variable */
  remove(key: string): Promise<boolean>
}

/**
 * Environment variable management interface
 *
 * Provides CRUD operations for platform environment variables.
 * Implementations map to platform-specific APIs
 * (e.g., Vercel REST API, Cloudflare Workers Secrets).
 */
export interface Env {
  /**
   * Get an environment variable
   *
   * @param key - Variable name
   * @returns The entry, or null if not found
   */
  get(key: string): Promise<EnvEntry | null>

  /**
   * Set an environment variable (create or update)
   *
   * @param entry - The variable to set
   */
  set(entry: Omit<EnvEntry, 'metadata'>): Promise<EnvEntry>

  /**
   * Remove an environment variable
   *
   * @param key - Variable name
   * @returns true if the variable existed
   */
  remove(key: string): Promise<boolean>

  /**
   * List all environment variables
   *
   * @returns Array of entries (sensitive values may be masked)
   */
  list(): Promise<EnvEntry[]>
}
