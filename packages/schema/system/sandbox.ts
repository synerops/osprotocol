/**
 * Sandbox
 *
 * @experimental No real implementation yet.
 *
 * Isolated execution environments for running agent workloads.
 * The kernel interface for creating, managing, and interacting
 * with sandboxed environments (Vercel Sandbox, E2B,
 * Cloudflare Workers, Docker).
 */

/**
 * Sandbox status lifecycle
 */
export type SandboxStatus =
  | 'pending'
  | 'running'
  | 'stopping'
  | 'stopped'
  | 'failed'

/**
 * Sandbox summary for listing
 */
export interface SandboxEntry {
  /** Unique sandbox identifier */
  id: string
  /** Current lifecycle status */
  status: SandboxStatus
  /** When the sandbox was created (Unix ms) */
  createdAt: number
  /** Remaining time before auto-stop (ms) */
  timeout?: number
  /** Extensible metadata for provider-specific data */
  metadata?: Record<string, unknown>
}

/**
 * Configuration for creating a new sandbox
 */
export interface SandboxConfig {
  /** Runtime or template identifier (e.g., "node24", "python3.13") */
  runtime?: string
  /** Initial timeout in milliseconds before auto-stop */
  timeout?: number
  /** Environment variables to inject */
  env?: Record<string, string>
  /** Ports to expose for external access */
  ports?: number[]
  /** Extensible metadata for provider-specific data */
  metadata?: Record<string, unknown>
}

/**
 * Result of a command execution
 */
export interface CommandResult {
  /** Process exit code (0 = success) */
  exitCode: number
  /** Standard output */
  stdout: string
  /** Standard error */
  stderr: string
  /** Extensible metadata for provider-specific data */
  metadata?: Record<string, unknown>
}

/**
 * A file within the sandbox filesystem
 */
export interface SandboxFile {
  /** File path within the sandbox */
  path: string
  /** File contents */
  content: string
}

/**
 * Read-only sandbox context for the agent loop
 */
export interface SandboxContext {
  /** Get an existing sandbox by ID */
  get(id: string): Promise<SandboxEntry | null>
  /** List all sandboxes */
  list(): Promise<SandboxEntry[]>
}

/**
 * Sandbox write operations for the agent loop
 */
export interface SandboxActions {
  /** Create a new sandbox */
  create(config?: SandboxConfig): Promise<SandboxEntry>
  /** Stop and destroy a sandbox */
  stop(id: string): Promise<boolean>
  /** Execute a command inside a sandbox */
  exec(id: string, command: string, args?: string[]): Promise<CommandResult>
  /** Write files to the sandbox filesystem */
  writeFiles(id: string, files: SandboxFile[]): Promise<void>
  /** Read a file from the sandbox filesystem */
  readFile(id: string, path: string): Promise<string | null>
  /** Get a publicly accessible URL for an exposed port */
  getUrl(id: string, port: number): Promise<string | null>
  /** Extend the sandbox timeout */
  extendTimeout(id: string, duration: number): Promise<void>
}

/**
 * Sandbox management interface
 *
 * Provides lifecycle management for isolated execution
 * environments. Each sandbox has its own filesystem,
 * command execution, and optional network access.
 * Implementations map to provider-specific sandbox APIs.
 */
export interface Sandbox {
  /**
   * Create a new sandbox
   *
   * @param config - Sandbox configuration
   * @returns The created sandbox entry
   */
  create(config?: SandboxConfig): Promise<SandboxEntry>

  /**
   * Get an existing sandbox by ID
   *
   * @param id - Sandbox identifier
   * @returns The sandbox entry, or null if not found
   */
  get(id: string): Promise<SandboxEntry | null>

  /**
   * List all sandboxes
   *
   * @returns Array of sandbox entries
   */
  list(): Promise<SandboxEntry[]>

  /**
   * Stop and destroy a sandbox
   *
   * @param id - Sandbox identifier
   * @returns true if the sandbox existed
   */
  stop(id: string): Promise<boolean>

  /**
   * Execute a command inside a sandbox
   *
   * @param id - Sandbox identifier
   * @param command - Command to execute
   * @param args - Command arguments
   * @returns The command result with exit code and output
   */
  exec(id: string, command: string, args?: string[]): Promise<CommandResult>

  /**
   * Read a file from the sandbox filesystem
   *
   * @param id - Sandbox identifier
   * @param path - File path within the sandbox
   * @returns File contents, or null if not found
   */
  readFile(id: string, path: string): Promise<string | null>

  /**
   * Write files to the sandbox filesystem
   *
   * @param id - Sandbox identifier
   * @param files - Files to write
   */
  writeFiles(id: string, files: SandboxFile[]): Promise<void>

  /**
   * Get a publicly accessible URL for an exposed port
   *
   * @param id - Sandbox identifier
   * @param port - Port number
   * @returns The public URL, or null if the port is not exposed
   */
  getUrl(id: string, port: number): Promise<string | null>

  /**
   * Extend the sandbox timeout
   *
   * @param id - Sandbox identifier
   * @param duration - Additional time in milliseconds
   */
  extendTimeout(id: string, duration: number): Promise<void>
}
