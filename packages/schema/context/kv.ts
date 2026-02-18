/**
 * Key-Value Store
 *
 * @experimental No real implementation yet.
 *
 * Flat key-value persistence for structured data.
 * The agent-facing interface for storing and retrieving
 * data by key. Unlike fs (hierarchical, file-based) and
 * embeddings (semantic search), kv is for direct access
 * by known keys (Cloudflare KV, Vercel KV, Deno KV,
 * Upstash Redis).
 */

/**
 * A key-value entry
 *
 * @template T - The type of stored value
 */
export interface KvEntry<T = unknown> {
  /** Entry key */
  key: string
  /** Entry value */
  value: T
  /** Extensible metadata for provider-specific data */
  metadata?: Record<string, unknown>
}

/**
 * Read-only kv context for the agent loop
 */
export interface KvContext {
  /**
   * Get a value by key
   *
   * @template T - The type of stored value
   * @param key - Entry key
   * @returns The entry, or null if not found
   */
  get<T = unknown>(key: string): Promise<KvEntry<T> | null>

  /**
   * List keys matching a prefix
   *
   * @param prefix - Key prefix (e.g., "user:123:")
   * @returns Array of matching keys
   */
  list(prefix?: string): Promise<string[]>
}

/**
 * Kv write operations for the agent loop
 */
export interface KvActions {
  /**
   * Set a value (create or update)
   *
   * @template T - The type of stored value
   * @param key - Entry key
   * @param value - Entry value
   * @returns The stored entry
   */
  set<T = unknown>(key: string, value: T): Promise<KvEntry<T>>

  /**
   * Remove an entry
   *
   * @param key - Entry key
   * @returns true if the entry existed
   */
  remove(key: string): Promise<boolean>
}

/**
 * Key-value store interface
 *
 * Provides flat key-value persistence. Agents use this
 * for structured data that needs direct access by key.
 * Implementations map to platform KV stores.
 */
export interface Kv {
  /**
   * Get a value by key
   *
   * @template T - The type of stored value
   * @param key - Entry key
   * @returns The entry, or null if not found
   */
  get<T = unknown>(key: string): Promise<KvEntry<T> | null>

  /**
   * Set a value (create or update)
   *
   * @template T - The type of stored value
   * @param key - Entry key
   * @param value - Entry value
   * @returns The stored entry
   */
  set<T = unknown>(key: string, value: T): Promise<KvEntry<T>>

  /**
   * Remove an entry
   *
   * @param key - Entry key
   * @returns true if the entry existed
   */
  remove(key: string): Promise<boolean>

  /**
   * List keys matching a prefix
   *
   * @param prefix - Key prefix (e.g., "user:123:")
   * @returns Array of matching keys
   */
  list(prefix?: string): Promise<string[]>
}
