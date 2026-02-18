/**
 * MCP Servers
 *
 * @experimental No real implementation yet.
 *
 * Agent-facing interface for interacting with MCP servers.
 * While tools from MCP servers are accessible via the
 * unified Tools interface, this provides direct access
 * to MCP-specific capabilities: resources and prompts.
 * The infrastructure side lives in system/mcp-client.ts.
 * (Anthropic MCP, AAIF MCP Standard).
 */

/**
 * An MCP resource
 */
export interface McpResource {
  /** Resource URI */
  uri: string
  /** Human-readable name */
  name: string
  /** MIME type of the resource content */
  mimeType?: string
  /** Resource description */
  description?: string
  /** Extensible metadata for provider-specific data */
  metadata?: Record<string, unknown>
}

/**
 * An MCP prompt
 */
export interface McpPrompt {
  /** Prompt name */
  name: string
  /** Human-readable description */
  description?: string
  /** Arguments the prompt accepts */
  arguments?: object
  /** Extensible metadata for provider-specific data */
  metadata?: Record<string, unknown>
}

/**
 * MCP server interaction interface
 *
 * Provides agent-facing access to MCP server capabilities
 * beyond tool execution. Resources expose data and content,
 * prompts provide reusable templates. Tool execution goes
 * through the unified Tools interface.
 */
export interface McpServers {
  /**
   * List resources from a connected MCP server
   *
   * @param server - MCP server name
   * @returns Array of available resources
   */
  listResources(server: string): Promise<McpResource[]>

  /**
   * Read a resource from an MCP server
   *
   * @param server - MCP server name
   * @param uri - Resource URI
   * @returns Resource content as string, or null if not found
   */
  readResource(server: string, uri: string): Promise<string | null>

  /**
   * List prompts from a connected MCP server
   *
   * @param server - MCP server name
   * @returns Array of available prompts
   */
  listPrompts(server: string): Promise<McpPrompt[]>

  /**
   * Get a prompt from an MCP server
   *
   * @param server - MCP server name
   * @param name - Prompt name
   * @param args - Prompt arguments
   * @returns The rendered prompt content, or null if not found
   */
  getPrompt(server: string, name: string, args?: Record<string, string>): Promise<string | null>
}
