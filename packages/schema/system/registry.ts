/**
 * Registry
 *
 * @experimental No real implementation yet.
 *
 * Registration and discovery of resources in the system.
 * The kernel interface for managing what is available
 * and finding it by criteria. Providers extend this
 * for specific resource types (agents, skills, MCP servers).
 * (Google A2A Agent Cards, Microsoft AutoGen Registry,
 * AGENTS.md/AAIF Agent Discovery, npm Registry).
 */

/**
 * A registry entry
 *
 * @template T - The type of the registered resource
 */
export interface RegistryEntry<T = unknown> {
  /** Unique identifier */
  name: string
  /** Human-readable description */
  description: string
  /** The registered resource */
  resource: T
  /** Extensible metadata for provider-specific data */
  metadata?: Record<string, unknown>
}

/**
 * Read-only registry context for the agent loop
 */
export interface RegistryContext {
  /** Get a resource from a named registry */
  get<T = unknown>(registry: string, name: string): Promise<RegistryEntry<T> | null>
  /** List all resources in a named registry */
  list<T = unknown>(registry: string): Promise<RegistryEntry<T>[]>
}

/**
 * Registry write operations for the agent loop
 */
export interface RegistryActions {
  /** Register a resource in a named registry */
  register<T = unknown>(registry: string, entry: RegistryEntry<T>): Promise<void>
  /** Unregister a resource from a named registry */
  unregister(registry: string, name: string): Promise<boolean>
}

/**
 * Resource registry management interface
 *
 * Provides registration, discovery, and lookup for
 * any type of system resource. Providers implement
 * this with specific resource types.
 *
 * @template T - The type of the registered resource
 */
export interface Registry<T = unknown> {
  /**
   * Register a resource
   *
   * @param entry - Registry entry
   */
  register(entry: RegistryEntry<T>): Promise<void>

  /**
   * Unregister a resource
   *
   * @param name - Resource name
   * @returns true if the resource was registered
   */
  unregister(name: string): Promise<boolean>

  /**
   * Get a resource by name
   *
   * @param name - Resource name
   * @returns The registry entry, or null if not found
   */
  get(name: string): Promise<RegistryEntry<T> | null>

  /**
   * List all registered resources
   *
   * @returns Array of all registry entries
   */
  list(): Promise<RegistryEntry<T>[]>

  /**
   * Find resources matching criteria
   *
   * @param criteria - Partial match against resource fields
   * @returns Array of matching registry entries
   */
  find(criteria: Partial<T>): Promise<RegistryEntry<T>[]>
}
