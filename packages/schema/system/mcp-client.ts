/**
 * MCP Client
 *
 * @experimental No real implementation yet.
 *
 * Platform-level MCP (Model Context Protocol) client.
 * The kernel interface for connecting to and managing
 * external MCP servers that provide tools, resources,
 * and prompts to the system (Claude Code MCP, Cursor
 * MCP, VS Code Copilot MCP).
 */

/**
 * MCP server connection status
 */
export type McpServerStatus = 'connected' | 'disconnected' | 'error'

/**
 * An MCP server connection entry
 */
export interface McpServerEntry {
  /** Unique identifier for this connection */
  name: string
  /** Server transport URI (stdio, SSE, streamable HTTP) */
  uri: string
  /** Current connection status */
  status: McpServerStatus
  /** Tools exposed by this server */
  tools?: string[]
  /** Extensible metadata for provider-specific data */
  metadata?: Record<string, unknown>
}

/**
 * Read-only MCP client context for the agent loop
 */
export interface McpContext {
  /** Get an MCP server connection by name */
  get(name: string): Promise<McpServerEntry | null>
  /** List all MCP server connections */
  list(): Promise<McpServerEntry[]>
}

/**
 * MCP client write operations for the agent loop
 */
export interface McpActions {
  /** Connect to an MCP server */
  connect(name: string, uri: string): Promise<McpServerEntry>
  /** Disconnect from an MCP server */
  disconnect(name: string): Promise<boolean>
}

/**
 * MCP client management interface
 *
 * Provides infrastructure-level management of MCP server
 * connections. This is the kernel's device driver manager —
 * it connects to external capability providers. The agent-facing
 * side lives in actions/mcp-servers.ts.
 */
export interface McpClient {
  /**
   * Connect to an MCP server
   *
   * @param name - Connection identifier
   * @param uri - Server transport URI
   * @returns The connection entry
   */
  connect(name: string, uri: string): Promise<McpServerEntry>

  /**
   * Disconnect from an MCP server
   *
   * @param name - Connection identifier
   * @returns true if the connection existed
   */
  disconnect(name: string): Promise<boolean>

  /**
   * Get a connection by name
   *
   * @param name - Connection identifier
   * @returns The connection entry, or null if not found
   */
  get(name: string): Promise<McpServerEntry | null>

  /**
   * List all MCP server connections
   *
   * @returns Array of all connection entries
   */
  list(): Promise<McpServerEntry[]>
}
