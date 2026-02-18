/**
 * Agent Preferences
 *
 * @experimental No real implementation yet.
 *
 * Per-agent or per-user preference storage.
 * The kernel interface for managing scoped configuration
 * that customizes agent behavior without affecting
 * the global system (VS Code Settings, Claude Code
 * Scoped Config, GitHub User Preferences).
 */

/**
 * Preference scope
 *
 * Resolution cascades: agent > user > system.
 * The 'system' scope is a passthrough to system settings.
 */
export type PreferenceScope = 'agent' | 'user' | 'system'

/**
 * A preference entry
 *
 * @template T - The type of the preference value
 */
export interface PreferenceEntry<T = unknown> {
  /** Preference key */
  key: string
  /** Preference value */
  value: T
  /** Scope this preference applies to */
  scope: PreferenceScope
  /** Extensible metadata for provider-specific data */
  metadata?: Record<string, unknown>
}

/**
 * Read-only preferences context for the agent loop
 */
export interface PreferencesContext {
  /** Get a preference by key and scope */
  get<T = unknown>(key: string, scope: PreferenceScope): Promise<PreferenceEntry<T> | null>
  /** List all preferences for a given scope */
  list(scope: PreferenceScope): Promise<PreferenceEntry[]>
}

/**
 * Preferences write operations for the agent loop
 */
export interface PreferencesActions {
  /** Set a preference value (create or update) */
  set<T = unknown>(key: string, value: T, scope: PreferenceScope): Promise<PreferenceEntry<T>>
  /** Remove a preference */
  remove(key: string, scope: PreferenceScope): Promise<boolean>
}

/**
 * Agent preferences management interface
 *
 * Provides scoped CRUD operations for per-agent and
 * per-user configuration. For system-wide settings,
 * see settings.ts.
 */
export interface Preferences {
  /**
   * Get a preference by key and scope
   *
   * @template T - The type of the preference value
   * @param key - Preference key
   * @param scope - Preference scope
   * @returns The preference entry, or null if not found
   */
  get<T = unknown>(key: string, scope: PreferenceScope): Promise<PreferenceEntry<T> | null>

  /**
   * Set a preference value (create or update)
   *
   * @template T - The type of the preference value
   * @param key - Preference key
   * @param value - Preference value
   * @param scope - Preference scope
   * @returns The created or updated entry
   */
  set<T = unknown>(key: string, value: T, scope: PreferenceScope): Promise<PreferenceEntry<T>>

  /**
   * Remove a preference
   *
   * @param key - Preference key
   * @param scope - Preference scope
   * @returns true if the preference existed
   */
  remove(key: string, scope: PreferenceScope): Promise<boolean>

  /**
   * List all preferences for a given scope
   *
   * @param scope - Preference scope
   * @returns Array of preference entries
   */
  list(scope: PreferenceScope): Promise<PreferenceEntry[]>
}
