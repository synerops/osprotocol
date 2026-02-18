/**
 * System Actions
 *
 * @experimental No real implementation yet.
 *
 * Write operations for all system state during the
 * actions phase of the agent loop. Pure composition —
 * each system API owns its own Actions interface.
 * Read operations live in context/system.ts.
 */

import type { EnvActions } from '../system/env'
import type { SettingsActions } from '../system/settings'
import type { PreferencesActions } from '../system/preferences'
import type { RegistryActions } from '../system/registry'
import type { FsActions } from '../system/fs'
import type { SandboxActions } from '../system/sandbox'
import type { InstallerActions } from '../system/installer'
import type { McpActions } from '../system/mcp-client'

export type {
  EnvActions,
  SettingsActions,
  PreferencesActions,
  RegistryActions,
  FsActions,
  SandboxActions,
  InstallerActions,
  McpActions,
}

/**
 * System write operations interface
 *
 * Composes all system write interfaces into a single
 * entry point for the actions phase of the agent loop.
 * All mutations go through this interface.
 */
export interface SystemActions {
  /** Environment variables */
  env: EnvActions
  /** System-wide settings */
  settings: SettingsActions
  /** Scoped preferences */
  preferences: PreferencesActions
  /** Resource registries */
  registry: RegistryActions
  /** Host filesystem */
  fs: FsActions
  /** Sandbox environments */
  sandbox: SandboxActions
  /** Installed packages */
  installer: InstallerActions
  /** MCP server connections */
  mcp: McpActions
}
