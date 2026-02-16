/**
 * Cache Capability
 *
 * Defines interfaces for temporary, evictable data optimization.
 * Cache is a derived layer — it stores data that can be reconstructed
 * from the source of truth (storage or external systems).
 *
 * Supports HTTP caching semantics (ETag, Last-Modified) for
 * efficient integration with external APIs.
 */

/**
 * A cached entry with optional HTTP caching metadata
 *
 * @template T - The type of cached data
 */
export interface CacheEntry<T = unknown> {
  /** The cached data */
  data: T
  /** When this entry was cached (Unix ms timestamp) */
  cachedAt: number
  /** When this entry expires (Unix ms timestamp) */
  expiresAt?: number
  /** HTTP ETag for conditional requests */
  etag?: string
  /** HTTP Last-Modified for conditional requests */
  lastModified?: string
  /** Extensible metadata for provider-specific data */
  metadata?: Record<string, unknown>
}

/**
 * Cache statistics for observability
 */
export interface CacheStats {
  /** Total cache hits */
  hits: number
  /** Total cache misses */
  misses: number
  /** Number of entries currently in cache */
  size: number
  /** Total bytes used (if known) */
  bytes?: number
}

/**
 * Cache capability interface
 *
 * Provides temporary, evictable storage with TTL-based expiration,
 * HTTP caching semantics, pattern-based invalidation, and
 * observable metrics.
 */
export interface Cache {
  /**
   * Get entry by key
   *
   * @template T - The type of cached data
   * @param key - Cache key
   * @returns The cache entry, or null if not found or expired
   */
  get<T = unknown>(key: string): Promise<CacheEntry<T> | null>

  /**
   * Set entry with optional TTL
   *
   * @template T - The type of cached data
   * @param key - Cache key
   * @param entry - Entry data (cachedAt is set automatically)
   * @param ttl - Time to live in seconds
   */
  set<T = unknown>(
    key: string,
    entry: Omit<CacheEntry<T>, 'cachedAt'>,
    ttl?: number
  ): Promise<void>

  /**
   * Delete a single entry
   *
   * @param key - Cache key
   * @returns true if the entry existed
   */
  delete(key: string): Promise<boolean>

  /**
   * Check existence without retrieving
   *
   * @param key - Cache key
   */
  has(key: string): Promise<boolean>

  /**
   * Invalidate entries matching a glob pattern
   *
   * @param pattern - Glob pattern (e.g., "github:repo:*")
   * @returns Number of entries invalidated
   */
  invalidate(pattern: string): Promise<number>

  /**
   * Get cache statistics
   */
  stats(): Promise<CacheStats>
}
