/**
 * Storage Capability
 *
 * Defines interfaces for durable, authoritative data persistence.
 * Storage is the system of record — it holds data that is not
 * derived from other sources.
 *
 * Supports optimistic concurrency via versioning for safe
 * concurrent access patterns.
 */

/**
 * A durable storage entry with versioning metadata
 *
 * @template T - The type of stored data
 */
export interface StorageEntry<T = unknown> {
  /** The stored data */
  data: T
  /** When this entry was created (Unix ms timestamp) */
  createdAt: number
  /** When this entry was last updated (Unix ms timestamp) */
  updatedAt: number
  /** Version for optimistic concurrency */
  version?: number
  /** Extensible metadata */
  metadata?: Record<string, unknown>
}

/**
 * Storage capability interface
 *
 * Provides durable, authoritative data persistence with no
 * automatic expiration and optimistic concurrency support.
 */
export interface Storage {
  /**
   * Get entry by key
   *
   * @template T - The type of stored data
   * @param key - Storage key
   * @returns The storage entry, or null if not found
   */
  get<T = unknown>(key: string): Promise<StorageEntry<T> | null>

  /**
   * Put entry (create or update)
   *
   * @template T - The type of stored data
   * @param key - Storage key
   * @param data - Data to store
   * @param expectedVersion - For optimistic concurrency (optional)
   * @returns The created or updated entry
   */
  put<T = unknown>(
    key: string,
    data: T,
    expectedVersion?: number
  ): Promise<StorageEntry<T>>

  /**
   * Delete entry
   *
   * @param key - Storage key
   * @returns true if the entry existed
   */
  delete(key: string): Promise<boolean>

  /**
   * Check existence
   *
   * @param key - Storage key
   */
  has(key: string): Promise<boolean>

  /**
   * List keys matching a prefix
   *
   * @param prefix - Key prefix (e.g., "user:123:")
   * @returns Array of matching keys
   */
  list(prefix: string): Promise<string[]>
}
