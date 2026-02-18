/**
 * System Settings
 *
 * @experimental No real implementation yet.
 *
 * Global configuration that affects platform behavior.
 * The kernel interface for managing system-wide settings
 * that apply to all agents and workflows
 * (Vercel Project Settings, Cloudflare Zone Settings,
 * AWS SSM Parameter Store).
 */

/**
 * A system setting entry
 *
 * @template T - The type of the setting value
 */
export interface SettingsEntry<T = unknown> {
  /** Setting key */
  key: string
  /** Setting value */
  value: T
  /** Human-readable description */
  description?: string
  /** Whether this setting is read-only (cannot be changed at runtime) */
  readOnly?: boolean
  /** Extensible metadata for provider-specific data */
  metadata?: Record<string, unknown>
}

/**
 * Read-only settings context for the agent loop
 */
export interface SettingsContext {
  /** Get a system setting */
  get<T = unknown>(key: string): Promise<SettingsEntry<T> | null>
  /** List all settings */
  list(): Promise<SettingsEntry[]>
}

/**
 * Settings write operations for the agent loop
 */
export interface SettingsActions {
  /** Set a setting value (create or update) */
  set<T = unknown>(key: string, value: T): Promise<SettingsEntry<T>>
  /** Remove a setting (revert to default) */
  remove(key: string): Promise<boolean>
}

/**
 * System settings management interface
 *
 * Provides CRUD operations for global platform settings.
 * Settings are system-wide — for per-agent configuration,
 * see preferences.ts.
 */
export interface Settings {
  /**
   * Get a setting by key
   *
   * @template T - The type of the setting value
   * @param key - Setting key
   * @returns The setting entry, or null if not found
   */
  get<T = unknown>(key: string): Promise<SettingsEntry<T> | null>

  /**
   * Set a setting value (create or update)
   *
   * @template T - The type of the setting value
   * @param key - Setting key
   * @param value - Setting value
   * @returns The created or updated entry
   */
  set<T = unknown>(key: string, value: T): Promise<SettingsEntry<T>>

  /**
   * Remove a setting (revert to default)
   *
   * @param key - Setting key
   * @returns true if the setting existed
   */
  remove(key: string): Promise<boolean>

  /**
   * List all settings
   *
   * @returns Array of all setting entries
   */
  list(): Promise<SettingsEntry[]>
}
