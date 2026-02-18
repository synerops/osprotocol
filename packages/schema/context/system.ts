/**
 * System Context
 *
 * @experimental No real implementation yet.
 *
 * Read-only view of all system state for the context
 * phase of the agent loop. Pure composition — each
 * system API owns its own Context interface.
 * Write operations live in actions/system.ts.
 */

import type { EnvContext } from '../system/env'
import type { SettingsContext } from '../system/settings'
import type { PreferencesContext } from '../system/preferences'
import type { RegistryContext } from '../system/registry'
import type { FsContext } from '../system/fs'
import type { SandboxContext } from '../system/sandbox'
import type { InstallerContext } from '../system/installer'
import type { McpContext } from '../system/mcp-client'

export type {
  EnvContext,
  SettingsContext,
  PreferencesContext,
  RegistryContext,
  FsContext,
  SandboxContext,
  InstallerContext,
  McpContext,
}

/**
 * Read-only system context interface
 *
 * Composes all system read interfaces into a single
 * entry point for the context phase of the agent loop.
 * Enforces zero-trust by limiting the agent to
 * observation, not mutation.
 */
export interface SystemContext {
  /** Environment variables */
  env: EnvContext
  /** System-wide settings */
  settings: SettingsContext
  /** Scoped preferences */
  preferences: PreferencesContext
  /** Resource registries */
  registry: RegistryContext
  /** Host filesystem */
  fs: FsContext
  /** Sandbox environments */
  sandbox: SandboxContext
  /** Installed packages */
  installer: InstallerContext
  /** MCP server connections */
  mcp: McpContext
}
