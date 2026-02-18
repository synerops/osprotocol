/**
 * Tools
 *
 * @experimental No real implementation yet.
 *
 * Tool discovery and execution for the actions phase.
 * The agent-facing interface for invoking tools regardless
 * of their source (MCP servers, built-in, custom).
 * (Anthropic MCP Tools, OpenAI Function Calling,
 * Vercel AI SDK Tools, LangChain Tools).
 */

/**
 * Tool definition
 *
 * @template TParams - The type of tool parameters
 * @template TResult - The type of tool result
 */
export interface Tool<TParams = unknown, TResult = unknown> {
  /** Tool name */
  name: string
  /** Human-readable description */
  description: string
  /** JSON Schema for parameters */
  parameters?: object
  /** Execute the tool */
  execute(params: TParams): Promise<TResult>
  /** Extensible metadata for provider-specific data */
  metadata?: Record<string, unknown>
}

/**
 * Tool execution result
 */
export interface ToolResult<T = unknown> {
  /** The tool that was executed */
  toolName: string
  /** Execution result */
  result: T
  /** Whether execution succeeded */
  success: boolean
  /** Error message if execution failed */
  error?: string
  /** Extensible metadata for provider-specific data */
  metadata?: Record<string, unknown>
}

/**
 * Tool management and execution interface
 *
 * Provides discovery and invocation of tools from any
 * source. Implementations aggregate tools from MCP
 * servers, built-in capabilities, and custom providers
 * into a unified execution surface.
 */
export interface Tools {
  /**
   * Get a tool by name
   *
   * @param name - Tool name
   * @returns The tool, or null if not found
   */
  get(name: string): Promise<Tool | null>

  /**
   * List all available tools
   *
   * @returns Array of available tools
   */
  list(): Promise<Tool[]>

  /**
   * Execute a tool by name
   *
   * @template T - The type of the result
   * @param name - Tool name
   * @param params - Tool parameters
   * @returns The execution result
   */
  execute<T = unknown>(name: string, params?: unknown): Promise<ToolResult<T>>
}
