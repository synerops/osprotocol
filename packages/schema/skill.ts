/**
 * Skill Schema
 *
 * Defines the structure for SKILL.md files.
 * Skills are capabilities/APIs that agents can use.
 */

/**
 * Protocol domain categories
 */
export type ProtocolDomain =
  | 'system'
  | 'context'
  | 'actions'
  | 'checks'
  | 'skills'
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

/**
 * Skill metadata (YAML frontmatter in SKILL.md)
 */
export interface SkillMetadata {
  /** Unique identifier for the skill */
  name: string
  /** Human-readable description */
  description: string
  /** Protocol reference */
  protocol: ProtocolReference
  /** Parent skill to extend from (optional) */
  extends?: string
}

/**
 * Full Skill definition (metadata + content from SKILL.md)
 */
export interface Skill {
  /** Metadata from YAML frontmatter */
  metadata: SkillMetadata
  /** Markdown content (documentation, examples) */
  content: string
  /** File path where skill was loaded from */
  path: string
}

/**
 * Skill registry entry for discovery
 */
export interface SkillRegistryEntry {
  /** Skill name */
  name: string
  /** Protocol domain */
  domain: ProtocolDomain
  /** API name */
  api: string
  /** File path to SKILL.md */
  path: string
  /** Whether skill definition has been loaded */
  loaded: boolean
}

/**
 * Tool definition for skill tools
 */
export interface Tool<TParams = unknown, TResult = unknown> {
  /** Tool description */
  description: string
  /** JSON schema for parameters */
  parameters?: object
  /** Execute the tool */
  execute(params: TParams): Promise<TResult>
}

/**
 * Loaded skill with tools ready for use
 */
export interface LoadedSkill {
  /** Skill definition */
  definition: Skill
  /** Available tools (from tools/ directory) */
  tools: Record<string, Tool>
}
