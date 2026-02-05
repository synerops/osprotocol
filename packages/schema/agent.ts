/**
 * Agent Schema
 *
 * Defines the structure for AGENT.md files.
 * Agents are the primary actors in Syner OS.
 */

/**
 * Annotations for agent discovery and routing
 */
export interface AgentAnnotations {
  /** Conditions under which this agent should be used */
  whenToUse: string[]
  /** Example inputs/tasks this agent handles well */
  examples?: string[]
}

/**
 * Agent metadata (YAML frontmatter in AGENT.md)
 */
export interface AgentMetadata {
  /** Unique identifier for the agent */
  name: string
  /** Human-readable description */
  description: string
  /** Semantic version (optional) */
  version?: string
  /** Parent agent to extend from (optional) */
  extends?: string
  /** Tools this agent has access to (e.g., 'fs.read', 'checks.rules') */
  tools?: string[]
  /** Workflow patterns this agent can use (e.g., 'routing', 'parallelization') */
  workflows?: string[]
  /** Discovery annotations */
  annotations?: AgentAnnotations
}

/**
 * Full Agent definition (metadata + content from AGENT.md)
 */
export interface Agent {
  /** Metadata from YAML frontmatter */
  metadata: AgentMetadata
  /** Markdown content (instructions, personality, rules) */
  content: string
  /** File path where agent was loaded from */
  path: string
}

/**
 * Agent registry entry for discovery
 */
export interface AgentRegistryEntry {
  /** Agent name */
  name: string
  /** Agent description */
  description: string
  /** File path to AGENT.md */
  path: string
  /** Whether agent definition has been loaded */
  loaded: boolean
  /** Optional parent agent name */
  extends?: string
}
