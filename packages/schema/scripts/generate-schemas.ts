#!/usr/bin/env bun
/**
 * JSON Schema Generator for OS Protocol
 *
 * Generates JSON Schemas from TypeScript interfaces and outputs them to apps/web/public/v1/
 */

import * as fs from 'node:fs'
import * as path from 'node:path'
import * as tsj from 'ts-json-schema-generator'

const SCHEMA_PACKAGE = path.resolve(import.meta.dir, '..')
const OUTPUT_DIR = path.resolve(SCHEMA_PACKAGE, '..', '..', 'apps', 'web', 'public', 'v1')

interface SchemaDefinition {
  /** Source TypeScript file */
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
  // Agent schema (AGENT.md)
  {
    source: 'agent.ts',
    type: 'AgentMetadata',
    output: 'agent.md.json',
    title: 'AGENT.md Schema',
    description: 'JSON Schema for AGENT.md frontmatter metadata',
  },

  // Skill schema (SKILL.md)
  {
    source: 'skill.ts',
    type: 'SkillMetadata',
    output: 'skill.md.json',
    title: 'SKILL.md Schema',
    description: 'JSON Schema for SKILL.md frontmatter metadata',
  },

  // Workflows
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

  // Runs
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
]

function generateSchema(def: SchemaDefinition): object {
  const sourcePath = path.join(SCHEMA_PACKAGE, def.source)

  const config: tsj.Config = {
    path: sourcePath,
    type: def.type,
    tsconfig: path.join(SCHEMA_PACKAGE, 'tsconfig.json'),
    skipTypeCheck: true,
    expose: 'export',
    topRef: false,
    jsDoc: 'extended',
    extraTags: [],
  }

  const generator = tsj.createGenerator(config)
  const schema = generator.createSchema(def.type)

  // Add metadata
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
  // Remove properties that are functions (not serializable)
  const result = { ...schema }

  if (result.properties && typeof result.properties === 'object') {
    const props = result.properties as Record<string, unknown>
    for (const [key, value] of Object.entries(props)) {
      // Skip explicit callback properties
      if (CALLBACK_PROPERTIES.has(key)) {
        delete props[key]
      } else if (typeof value === 'object' && value !== null) {
        // Recursively filter nested objects
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

  // Also filter from 'required' array if present
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

  // Filter callbacks before writing
  const filteredSchema = filterCallbacks(schema as Record<string, unknown>)

  fs.writeFileSync(outputPath, JSON.stringify(filteredSchema, null, 2) + '\n')
  console.log(`✓ Generated ${def.output}`)
}

function generateIndexSchema() {
  const indexSchema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    $id: 'https://osprotocol.dev/v1/schema.json',
    title: 'OS Protocol v1',
    description: 'JSON Schema index for the Agentic OS Protocol',
    type: 'object',
    $defs: {
      Agent: { $ref: 'agent.md.json' },
      Skill: { $ref: 'skill.md.json' },
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
    },
    $comment: 'System, Context, Actions, Checks - coming in future versions',
  }

  const outputPath = path.join(OUTPUT_DIR, 'schema.json')
  ensureDir(outputPath)
  fs.writeFileSync(outputPath, JSON.stringify(indexSchema, null, 2) + '\n')
  console.log('✓ Generated schema.json (index)')
}

async function main() {
  console.log('Generating JSON Schemas for OS Protocol...\n')

  // Clean output directory
  if (fs.existsSync(OUTPUT_DIR)) {
    fs.rmSync(OUTPUT_DIR, { recursive: true })
  }
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })

  // Generate all schemas
  for (const def of schemas) {
    try {
      const schema = generateSchema(def)
      writeSchema(def, schema)
    } catch (error) {
      console.error(`✗ Failed to generate ${def.output}:`, error)
      process.exit(1)
    }
  }

  // Generate index schema
  generateIndexSchema()

  console.log(`\n✓ All schemas generated in ${OUTPUT_DIR}`)
}

main()
