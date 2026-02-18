/**
 * App Schema
 *
 * @experimental No real implementation yet.
 *
 * Agentic OS distribution manifest format. Defines the
 * YAML frontmatter types for distribution files (e.g.
 * SYNER.md, APP.md, ACADEMY.md — the filename is up
 * to the author, the format is what matters).
 *
 * An "app" is a distribution of the Agentic OS: it
 * declares which vendors implement which protocol
 * interfaces. Like AGENT.md defines an agent and
 * SKILL.md defines a skill, the app file defines
 * a complete agentic system configuration.
 *
 * The markdown body is free-form documentation —
 * instructions, architecture notes, onboarding guides.
 * The frontmatter is the structured, machine-readable
 * distribution manifest.
 *
 * Cross-referenced: package.json, Docker Compose,
 * Helm Chart.yaml, claude_desktop_config.json,
 * Cursor mcp.json, VS Code mcp.json, vercel.json.
 */

// ---------------------------------------------------------------------------
// Provider Bindings
// ---------------------------------------------------------------------------

/**
 * A provider binding
 *
 * Maps an abstract protocol interface to a concrete
 * vendor implementation. Each entry in the providers
 * map declares who implements what.
 *
 * ```yaml
 * providers:
 *   system:
 *     env:
 *       provider: '@vercel/env'
 *     sandbox:
 *       provider: '@vercel/sandbox'
 *       version: '^1.0.0'
 * ```
 */
export interface ProviderEntry {
  /** Provider package or identifier */
  provider: string
  /** Provider version (SemVer range) */
  version?: string
  /** Whether this provider is enabled */
  enabled?: boolean
  /** Extensible metadata for provider-specific config */
  metadata?: Record<string, unknown>
}

/**
 * Provider bindings organized by protocol domain
 *
 * Maps each protocol domain's interfaces to their
 * concrete vendor implementations. Granularity is
 * per individual interface, not per domain.
 *
 * ```yaml
 * providers:
 *   system:
 *     env: { provider: '@vercel/env' }
 *     fs: { provider: '@vercel/blob' }
 *     sandbox: { provider: '@vercel/sandbox' }
 *   context:
 *     embeddings: { provider: '@upstash/vector' }
 *   checks:
 *     screenshot: { provider: 'playwright' }
 *     judge: { provider: '@braintrust/judge' }
 * ```
 */
export interface ProviderMap {
  /** System-level interface providers */
  system?: Record<string, ProviderEntry>
  /** Context-level interface providers */
  context?: Record<string, ProviderEntry>
  /** Actions-level interface providers */
  actions?: Record<string, ProviderEntry>
  /** Checks-level interface providers */
  checks?: Record<string, ProviderEntry>
}

// ---------------------------------------------------------------------------
// App Metadata (YAML frontmatter)
// ---------------------------------------------------------------------------

/**
 * App metadata (YAML frontmatter in the distribution file)
 *
 * Follows the same pattern as AgentMetadata and
 * SkillMetadata — structured data in YAML frontmatter,
 * free-form markdown body.
 *
 * ```yaml
 * ---
 * name: '@synerops/syner-os'
 * version: '1.0.0'
 * description: 'Syner OS — AI-powered development platform'
 * protocol: '0.1.0'
 * providers:
 *   system:
 *     sandbox: { provider: '@vercel/sandbox' }
 *     fs: { provider: '@vercel/blob' }
 *   context:
 *     embeddings: { provider: '@upstash/vector' }
 * ---
 *
 * # Syner OS
 *
 * Syner OS is an AI-powered development platform...
 * ```
 */
export interface AppMetadata {
  /** Distribution name (scoped, e.g. '@org/my-os') */
  name: string
  /** SemVer version */
  version: string
  /** Human-readable description */
  description?: string
  /** Minimum OS Protocol version required */
  protocol?: string
  /** Provider bindings per protocol domain */
  providers?: ProviderMap
  /** Extensible metadata for distribution-specific data */
  metadata?: Record<string, unknown>
}

// ---------------------------------------------------------------------------
// Full App Definition
// ---------------------------------------------------------------------------

/**
 * Full App definition (metadata + content from distribution file)
 *
 * Follows the same pattern as Agent and Skill:
 * metadata from YAML frontmatter, content from
 * markdown body, path to the source file.
 */
export interface App {
  /** Metadata from YAML frontmatter */
  metadata: AppMetadata
  /** Markdown content (documentation, instructions) */
  content: string
  /** File path where the distribution file was loaded from */
  path: string
}
