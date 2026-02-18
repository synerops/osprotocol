/**
 * OS Protocol Schema
 *
 * TypeScript type definitions for the Agentic OS Protocol.
 *
 * @packageDocumentation
 */

// ---------------------------------------------------------------------------
// Protocol taxonomy
// ---------------------------------------------------------------------------

/**
 * Protocol domain categories
 *
 * The protocol is organized into 4 categories (Q4):
 * - Agent Loop: context, actions, checks
 * - System: system
 * - Execution: workflows, runs
 */
export type ProtocolDomain =
  | 'system'
  | 'context'
  | 'actions'
  | 'checks'
  | 'workflows'
  | 'runs'

/**
 * Protocol reference (domain + API)
 */
export interface ProtocolReference {
  /** The protocol domain */
  domain: ProtocolDomain
  /** The API name within the domain */
  api: string
}

// ---------------------------------------------------------------------------
// Core domains
// ---------------------------------------------------------------------------

// Workflow patterns
export * from './workflows'

// Run control
export * from './runs'

// System data
export * from './system/data'

// ---------------------------------------------------------------------------
// System interfaces (@experimental)
// ---------------------------------------------------------------------------

export type { Env, EnvEntry, EnvContext, EnvActions } from './system/env'
export type { Fs, FsEntry, FsContext, FsActions } from './system/fs'
export type {
  Sandbox,
  SandboxEntry,
  SandboxConfig,
  SandboxStatus,
  SandboxContext,
  SandboxActions,
  CommandResult,
  SandboxFile,
} from './system/sandbox'
export type {
  Settings,
  SettingsEntry,
  SettingsContext,
  SettingsActions,
} from './system/settings'
export type {
  Preferences,
  PreferenceEntry,
  PreferenceScope,
  PreferencesContext,
  PreferencesActions,
} from './system/preferences'
export type {
  Registry,
  RegistryEntry,
  RegistryContext,
  RegistryActions,
} from './system/registry'
export type {
  McpClient,
  McpServerEntry,
  McpServerStatus,
  McpContext,
  McpActions,
} from './system/mcp-client'
export type {
  Installer,
  InstallEntry,
  InstallStatus,
  InstallerContext,
  InstallerActions,
} from './system/installer'

// ---------------------------------------------------------------------------
// Context interfaces (@experimental)
// ---------------------------------------------------------------------------

export type { SystemContext } from './context/system'
export type {
  Embeddings,
  EmbeddingEntry,
} from './context/embeddings'

// ---------------------------------------------------------------------------
// Actions interfaces (@experimental)
// ---------------------------------------------------------------------------

export type { SystemActions } from './actions/system'
export type {
  Tools,
  Tool,
  ToolResult,
} from './actions/tools'
export type {
  McpServers,
  McpResource,
  McpPrompt,
} from './actions/mcp-servers'

// ---------------------------------------------------------------------------
// Checks interfaces (@experimental)
// ---------------------------------------------------------------------------

export type {
  Rules,
  Rule,
  RuleResult,
  RuleSeverity,
} from './checks/rules'
export type {
  Judge,
  JudgeConfig,
  JudgeResult,
} from './checks/judge'
export type {
  Audit,
  AuditEntry,
} from './checks/audit'
export type {
  Screenshot,
  ScreenshotEntry,
  ScreenshotOptions,
  ComparisonResult,
  ImageFormat,
} from './checks/screenshot'

// ---------------------------------------------------------------------------
// Apps (@experimental)
// ---------------------------------------------------------------------------

export type {
  App,
  AppMetadata,
  ProviderEntry,
  ProviderMap,
} from './apps/schema'
