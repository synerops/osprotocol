/**
 * Installer
 *
 * @experimental No real implementation yet.
 *
 * Installation and management of skills, tools, and
 * extensions. The kernel's package manager for adding
 * capabilities to the system at runtime
 * (npm, pip, Claude Code Skills, Homebrew).
 */

/**
 * Installation status
 */
export type InstallStatus = 'installed' | 'updating' | 'failed'

/**
 * An installed package entry
 */
export interface InstallEntry {
  /** Package identifier */
  name: string
  /** Installed version */
  version: string
  /** Current status */
  status: InstallStatus
  /** When this package was installed (Unix ms) */
  installedAt: number
  /** Extensible metadata for provider-specific data */
  metadata?: Record<string, unknown>
}

/**
 * Read-only installer context for the agent loop
 */
export interface InstallerContext {
  /** Get an installed package by name */
  get(name: string): Promise<InstallEntry | null>
  /** List all installed packages */
  list(): Promise<InstallEntry[]>
}

/**
 * Installer write operations for the agent loop
 */
export interface InstallerActions {
  /** Install a package */
  install(name: string, version?: string): Promise<InstallEntry>
  /** Uninstall a package */
  uninstall(name: string): Promise<boolean>
  /** Update a package to a specific or latest version */
  update(name: string, version?: string): Promise<InstallEntry>
}

/**
 * Package installer management interface
 *
 * Provides lifecycle management for installable
 * capabilities (skills, tools, extensions).
 * Implementations map to platform-specific package
 * managers and registries.
 */
export interface Installer {
  /**
   * Install a package
   *
   * @param name - Package identifier
   * @param version - Version to install (optional, defaults to latest)
   * @returns The installed entry
   */
  install(name: string, version?: string): Promise<InstallEntry>

  /**
   * Uninstall a package
   *
   * @param name - Package identifier
   * @returns true if the package was installed
   */
  uninstall(name: string): Promise<boolean>

  /**
   * Get an installed package by name
   *
   * @param name - Package identifier
   * @returns The install entry, or null if not installed
   */
  get(name: string): Promise<InstallEntry | null>

  /**
   * List all installed packages
   *
   * @returns Array of all installed entries
   */
  list(): Promise<InstallEntry[]>

  /**
   * Update a package to a specific or latest version
   *
   * @param name - Package identifier
   * @param version - Version to update to (optional, defaults to latest)
   * @returns The updated entry
   */
  update(name: string, version?: string): Promise<InstallEntry>
}
