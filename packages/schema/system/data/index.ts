/**
 * System Data
 *
 * State infrastructure for the Agentic OS. Data is not part of the
 * agent loop — it is the substrate over which cognition operates.
 *
 * Two sibling capabilities:
 * - Cache: temporary, evictable optimization layer
 * - Storage: durable, authoritative source of truth
 */

import type { Cache } from './cache'
import type { Storage } from './storage'

// Cache capability
export type { Cache, CacheEntry, CacheStats } from './cache'

// Storage capability
export type { Storage, StorageEntry } from './storage'

/**
 * Data domain — state infrastructure
 *
 * Contains capabilities for managing application state:
 * - storage: Durable source of truth
 * - cache: Temporary optimization layer
 *
 * Data is accessed indirectly through actions.
 */
export interface Data {
  /** Durable source of truth */
  storage: Storage
  /** Temporary optimization layer */
  cache: Cache
}
