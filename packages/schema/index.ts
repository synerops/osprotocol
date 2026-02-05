/**
 * OS Protocol Schema
 *
 * TypeScript type definitions for the Agentic OS Protocol.
 *
 * @packageDocumentation
 */

// Workflow patterns
export * from './workflows'

// Run control
export * from './runs'

// Agent schema (AGENT.md)
export type {
  Agent,
  AgentMetadata,
  AgentAnnotations,
  AgentRegistryEntry,
} from './agent'

// Skill schema (SKILL.md)
export type {
  Skill,
  SkillMetadata,
  SkillRegistryEntry,
  LoadedSkill,
  Tool,
  ProtocolDomain,
  ProtocolReference,
} from './skill'
