#!/usr/bin/env bun
/**
 * JSON Schema Generator for OS Protocol
 *
 * Generates JSON Schemas from TypeScript interfaces for cross-language validation.
 * Outputs to apps/web/public/v1/ so they're served at osprotocol.dev/v1/*.json
 */

import * as fs from 'node:fs'
import * as path from 'node:path'
import * as tsj from 'ts-json-schema-generator'

const SCHEMA_PACKAGE = path.resolve(import.meta.dir, '..', '..', '..', 'packages', 'schema')
const OUTPUT_DIR = path.resolve(import.meta.dir, '..', 'public', 'v1')

/** Path to the helper file that instantiates generic types for JSON Schema generation */
const SCHEMA_TYPES = path.resolve(import.meta.dir, 'schema-types.ts')
/** tsconfig that includes both schema package and the helper file */
const SCRIPTS_TSCONFIG = path.resolve(import.meta.dir, 'tsconfig.json')

interface SchemaDefinition {
  /** Source TypeScript file (relative to packages/schema/, or absolute) */
  source: string
  /** Type to export */
  type: string
  /** Output file name */
  output: string
  /** Schema title */
  title: string
  /** Schema description */
  description: string
}

const schemas: SchemaDefinition[] = [
  // --- Workflows (Core) ---
  {
    source: 'workflows/routing.ts',
    type: 'RouteConfig',
    output: 'workflows/routing.json',
    title: 'Routing Workflow Schema',
    description: 'Configuration for routing workflow patterns',
  },
  {
    source: 'workflows/orchestrator-workers.ts',
    type: 'Plan',
    output: 'workflows/orchestrator-workers.json',
    title: 'Orchestrator-Workers Workflow Schema',
    description: 'Execution plan for orchestrator-workers workflow',
  },
  {
    source: 'workflows/parallelization.ts',
    type: 'ParallelizationConfig',
    output: 'workflows/parallelization.json',
    title: 'Parallelization Workflow Schema',
    description: 'Configuration for parallelization workflow patterns',
  },
  {
    source: 'workflows/evaluator-optimizer.ts',
    type: 'EvaluatorOptimizerConfig',
    output: 'workflows/evaluator-optimizer.json',
    title: 'Evaluator-Optimizer Workflow Schema',
    description: 'Configuration for evaluator-optimizer workflow patterns',
  },

  // --- Runs (Core) ---
  {
    source: 'runs/run.ts',
    type: 'RunStatus',
    output: 'runs/run.json',
    title: 'Run Status Schema',
    description: 'Status values for workflow runs',
  },
  {
    source: 'runs/timeout.ts',
    type: 'Timeout',
    output: 'runs/timeout.json',
    title: 'Timeout Schema',
    description: 'Timeout configuration for workflow runs',
  },
  {
    source: 'runs/retry.ts',
    type: 'Retry',
    output: 'runs/retry.json',
    title: 'Retry Schema',
    description: 'Retry configuration for workflow runs',
  },
  {
    source: 'runs/cancel.ts',
    type: 'Cancel',
    output: 'runs/cancel.json',
    title: 'Cancel Schema',
    description: 'Cancel configuration for workflow runs',
  },
  {
    source: 'runs/approval.ts',
    type: 'ApprovalConfig',
    output: 'runs/approval.json',
    title: 'Approval Schema',
    description: 'Human-in-the-loop approval configuration',
  },

  // --- System (@experimental) ---
  {
    source: SCHEMA_TYPES,
    type: 'EnvEntrySchema',
    output: 'system/env.json',
    title: 'Environment Variable Entry Schema',
    description: 'Environment variable entry for platform-level configuration',
  },
  {
    source: 'system/fs.ts',
    type: 'FsEntry',
    output: 'system/fs.json',
    title: 'Filesystem Entry Schema',
    description: 'Filesystem entry representing a file or directory',
  },
  {
    source: 'system/sandbox.ts',
    type: 'SandboxConfig',
    output: 'system/sandbox-config.json',
    title: 'Sandbox Configuration Schema',
    description: 'Configuration for isolated execution environments',
  },
  {
    source: 'system/sandbox.ts',
    type: 'SandboxEntry',
    output: 'system/sandbox.json',
    title: 'Sandbox Entry Schema',
    description: 'Sandbox instance entry with lifecycle status',
  },
  {
    source: SCHEMA_TYPES,
    type: 'SettingsEntrySchema',
    output: 'system/settings.json',
    title: 'Settings Entry Schema',
    description: 'Platform settings entry (key-value with description)',
  },
  {
    source: SCHEMA_TYPES,
    type: 'PreferenceEntrySchema',
    output: 'system/preferences.json',
    title: 'Preference Entry Schema',
    description: 'User/agent/system preference entry with scope',
  },
  {
    source: SCHEMA_TYPES,
    type: 'RegistryEntrySchema',
    output: 'system/registry.json',
    title: 'Registry Entry Schema',
    description: 'Generic registry entry for agent, skill, or MCP server discovery',
  },
  {
    source: 'system/mcp-client.ts',
    type: 'McpServerEntry',
    output: 'system/mcp-server.json',
    title: 'MCP Server Entry Schema',
    description: 'MCP server connection entry with status and capabilities',
  },
  {
    source: 'system/installer.ts',
    type: 'InstallEntry',
    output: 'system/installer.json',
    title: 'Install Entry Schema',
    description: 'Installed package entry with version and status',
  },

  // --- Context (@experimental) ---
  {
    source: SCHEMA_TYPES,
    type: 'EmbeddingEntrySchema',
    output: 'context/embeddings.json',
    title: 'Embedding Entry Schema',
    description: 'Vector embedding entry with content, score, and metadata',
  },
  {
    source: SCHEMA_TYPES,
    type: 'KvEntrySchema',
    output: 'context/kv.json',
    title: 'Key-Value Entry Schema',
    description: 'Key-value persistence entry for agent state',
  },

  // --- Actions (@experimental) ---
  {
    source: SCHEMA_TYPES,
    type: 'ToolResultSchema',
    output: 'actions/tool-result.json',
    title: 'Tool Result Schema',
    description: 'Result of a tool execution (success or error)',
  },
  {
    source: 'actions/mcp-servers.ts',
    type: 'McpResource',
    output: 'actions/mcp-resource.json',
    title: 'MCP Resource Schema',
    description: 'Resource exposed by an MCP server',
  },
  {
    source: 'actions/mcp-servers.ts',
    type: 'McpPrompt',
    output: 'actions/mcp-prompt.json',
    title: 'MCP Prompt Schema',
    description: 'Prompt template exposed by an MCP server',
  },

  // --- Checks (@experimental) ---
  {
    source: 'checks/rules.ts',
    type: 'RuleResult',
    output: 'checks/rule-result.json',
    title: 'Rule Result Schema',
    description: 'Result of evaluating a verification rule',
  },
  {
    source: 'checks/judge.ts',
    type: 'JudgeConfig',
    output: 'checks/judge-config.json',
    title: 'Judge Configuration Schema',
    description: 'LLM-as-judge evaluation configuration',
  },
  {
    source: 'checks/judge.ts',
    type: 'JudgeResult',
    output: 'checks/judge-result.json',
    title: 'Judge Result Schema',
    description: 'Result of an LLM-as-judge evaluation',
  },
  {
    source: 'checks/audit.ts',
    type: 'AuditEntry',
    output: 'checks/audit.json',
    title: 'Audit Entry Schema',
    description: 'Audit trail entry recording verification results',
  },
  {
    source: 'checks/screenshot.ts',
    type: 'ScreenshotOptions',
    output: 'checks/screenshot-options.json',
    title: 'Screenshot Options Schema',
    description: 'Configuration for capturing screenshots',
  },
  {
    source: 'checks/screenshot.ts',
    type: 'ScreenshotEntry',
    output: 'checks/screenshot.json',
    title: 'Screenshot Entry Schema',
    description: 'Captured screenshot entry with dimensions and format',
  },
  {
    source: 'checks/screenshot.ts',
    type: 'ComparisonResult',
    output: 'checks/screenshot-comparison.json',
    title: 'Screenshot Comparison Result Schema',
    description: 'Result of comparing two screenshots for visual regression',
  },

  // --- Apps (@experimental) ---
  {
    source: 'apps/schema.ts',
    type: 'AppMetadata',
    output: 'apps/app.json',
    title: 'App Metadata Schema',
    description: 'Agentic OS distribution manifest metadata',
  },
  {
    source: 'apps/schema.ts',
    type: 'ProviderMap',
    output: 'apps/providers.json',
    title: 'Provider Map Schema',
    description: 'Provider bindings per protocol interface',
  },
]

function generateSchema(def: SchemaDefinition): object {
  const isHelper = path.isAbsolute(def.source)
  const sourcePath = isHelper ? def.source : path.join(SCHEMA_PACKAGE, def.source)

  const config: tsj.Config = {
    path: sourcePath,
    type: def.type,
    tsconfig: isHelper ? SCRIPTS_TSCONFIG : path.join(SCHEMA_PACKAGE, 'tsconfig.json'),
    skipTypeCheck: true,
    expose: 'all',
    topRef: false,
    jsDoc: 'extended',
    extraTags: [],
  }

  const generator = tsj.createGenerator(config)
  const schema = generator.createSchema(def.type)

  return {
    $schema: 'http://json-schema.org/draft-07/schema#',
    $id: `https://osprotocol.dev/v1/${def.output}`,
    title: def.title,
    description: def.description,
    ...schema,
  }
}

// Properties that are callbacks (functions) and should be excluded from JSON Schema
const CALLBACK_PROPERTIES = new Set([
  'onComplete',
  'onFailed',
  'onStatusChange',
  'onTimeoutCallback',
  'onRetry',
  'shouldRetry',
  'beforeCancel',
  'afterCancel',
])

function filterCallbacks(schema: Record<string, unknown>): Record<string, unknown> {
  const result = { ...schema }

  if (result.properties && typeof result.properties === 'object') {
    const props = result.properties as Record<string, unknown>
    for (const [key, value] of Object.entries(props)) {
      if (CALLBACK_PROPERTIES.has(key)) {
        delete props[key]
      } else if (typeof value === 'object' && value !== null) {
        props[key] = filterCallbacks(value as Record<string, unknown>)
      }
    }
  }

  if (result.$defs && typeof result.$defs === 'object') {
    const defs = result.$defs as Record<string, unknown>
    for (const [key, value] of Object.entries(defs)) {
      if (typeof value === 'object' && value !== null) {
        defs[key] = filterCallbacks(value as Record<string, unknown>)
      }
    }
  }

  if (result.definitions && typeof result.definitions === 'object') {
    const defs = result.definitions as Record<string, unknown>
    for (const [key, value] of Object.entries(defs)) {
      if (typeof value === 'object' && value !== null) {
        defs[key] = filterCallbacks(value as Record<string, unknown>)
      }
    }
  }

  if (result.required && Array.isArray(result.required)) {
    result.required = result.required.filter((prop: string) => !CALLBACK_PROPERTIES.has(prop))
  }

  return result
}

function ensureDir(filePath: string) {
  const dir = path.dirname(filePath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

function writeSchema(def: SchemaDefinition, schema: object) {
  const outputPath = path.join(OUTPUT_DIR, def.output)
  ensureDir(outputPath)

  const filteredSchema = filterCallbacks(schema as Record<string, unknown>)

  fs.writeFileSync(outputPath, JSON.stringify(filteredSchema, null, 2) + '\n')
  console.log(`  ${def.output}`)
}

function generateIndexSchema() {
  const indexSchema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    $id: 'https://osprotocol.dev/v1/schema.json',
    title: 'OS Protocol v1',
    description: 'JSON Schema index for the Agentic OS Protocol',
    type: 'object',
    $defs: {
      Workflows: {
        type: 'object',
        properties: {
          routing: { $ref: 'workflows/routing.json' },
          'orchestrator-workers': { $ref: 'workflows/orchestrator-workers.json' },
          parallelization: { $ref: 'workflows/parallelization.json' },
          'evaluator-optimizer': { $ref: 'workflows/evaluator-optimizer.json' },
        },
      },
      Runs: {
        type: 'object',
        properties: {
          run: { $ref: 'runs/run.json' },
          timeout: { $ref: 'runs/timeout.json' },
          retry: { $ref: 'runs/retry.json' },
          cancel: { $ref: 'runs/cancel.json' },
          approval: { $ref: 'runs/approval.json' },
        },
      },
      System: {
        type: 'object',
        properties: {
          env: { $ref: 'system/env.json' },
          fs: { $ref: 'system/fs.json' },
          sandbox: { $ref: 'system/sandbox.json' },
          'sandbox-config': { $ref: 'system/sandbox-config.json' },
          settings: { $ref: 'system/settings.json' },
          preferences: { $ref: 'system/preferences.json' },
          registry: { $ref: 'system/registry.json' },
          'mcp-server': { $ref: 'system/mcp-server.json' },
          installer: { $ref: 'system/installer.json' },
        },
      },
      Context: {
        type: 'object',
        properties: {
          embeddings: { $ref: 'context/embeddings.json' },
          kv: { $ref: 'context/kv.json' },
        },
      },
      Actions: {
        type: 'object',
        properties: {
          'tool-result': { $ref: 'actions/tool-result.json' },
          'mcp-resource': { $ref: 'actions/mcp-resource.json' },
          'mcp-prompt': { $ref: 'actions/mcp-prompt.json' },
        },
      },
      Checks: {
        type: 'object',
        properties: {
          'rule-result': { $ref: 'checks/rule-result.json' },
          'judge-config': { $ref: 'checks/judge-config.json' },
          'judge-result': { $ref: 'checks/judge-result.json' },
          audit: { $ref: 'checks/audit.json' },
          'screenshot-options': { $ref: 'checks/screenshot-options.json' },
          screenshot: { $ref: 'checks/screenshot.json' },
          'screenshot-comparison': { $ref: 'checks/screenshot-comparison.json' },
        },
      },
      Apps: {
        type: 'object',
        properties: {
          app: { $ref: 'apps/app.json' },
          providers: { $ref: 'apps/providers.json' },
        },
      },
    },
  }

  const outputPath = path.join(OUTPUT_DIR, 'schema.json')
  ensureDir(outputPath)
  fs.writeFileSync(outputPath, JSON.stringify(indexSchema, null, 2) + '\n')
  console.log('  schema.json (index)')
}

async function main() {
  console.log('Generating JSON Schemas for OS Protocol...\n')

  if (fs.existsSync(OUTPUT_DIR)) {
    fs.rmSync(OUTPUT_DIR, { recursive: true })
  }
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })

  let failed = 0
  for (const def of schemas) {
    try {
      const schema = generateSchema(def)
      writeSchema(def, schema)
    } catch (error) {
      console.error(`\n  FAILED ${def.output}:`, error)
      failed++
    }
  }

  generateIndexSchema()

  const total = schemas.length + 1 // +1 for index
  console.log(`\n${total - failed}/${total} schemas generated in public/v1/`)
  if (failed > 0) {
    console.error(`${failed} schema(s) failed — see errors above`)
    process.exit(1)
  }
}

main()
