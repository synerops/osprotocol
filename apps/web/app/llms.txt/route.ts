import { source } from '@/lib/source';
import { getSection } from '@/lib/navigation';
import { siteConfig } from '@/lib/metadata';
import * as fs from 'node:fs';
import * as path from 'node:path';

export const revalidate = false;

interface SchemaGroups {
  core: string[];
  workflows: string[];
  runs: string[];
}

function getSchemas(): SchemaGroups {
  const v1Dir = path.join(process.cwd(), 'public/v1');
  const schemas: SchemaGroups = {
    core: [],
    workflows: [],
    runs: [],
  };

  if (!fs.existsSync(v1Dir)) {
    return schemas;
  }

  // Core schemas (root level, excluding schema.json index)
  for (const file of fs.readdirSync(v1Dir)) {
    if (file.endsWith('.json') && file !== 'schema.json') {
      schemas.core.push(file);
    }
  }

  // Workflow schemas
  const workflowsDir = path.join(v1Dir, 'workflows');
  if (fs.existsSync(workflowsDir)) {
    schemas.workflows = fs.readdirSync(workflowsDir).filter((f) => f.endsWith('.json'));
  }

  // Run schemas
  const runsDir = path.join(v1Dir, 'runs');
  if (fs.existsSync(runsDir)) {
    schemas.runs = fs.readdirSync(runsDir).filter((f) => f.endsWith('.json'));
  }

  return schemas;
}

export async function GET() {
  const lines: string[] = [];

  // Header with canonical description
  lines.push(`# ${siteConfig.name}`);
  lines.push('');
  lines.push(`> ${siteConfig.description}`);
  lines.push('');

  // Quick Start
  lines.push('## Quick Start');
  lines.push('- [Introduction](/docs): Overview of the protocol');
  lines.push('- [AGENT.md](/docs/agent): Define agents');
  lines.push('- [SKILL.md](/docs/skill): Define skills');
  lines.push('');

  // Schemas (dynamic)
  const schemas = getSchemas();
  const hasSchemas = schemas.core.length > 0 || schemas.workflows.length > 0 || schemas.runs.length > 0;

  if (hasSchemas) {
    lines.push('## Schemas');
    lines.push('');

    // Always include the index
    lines.push('### Core');
    lines.push('- [schema.json](/v1/schema.json): JSON Schema index');
    for (const file of schemas.core.sort()) {
      lines.push(`- [${file}](/v1/${file})`);
    }
    lines.push('');

    if (schemas.workflows.length > 0) {
      lines.push('### Workflows');
      for (const file of schemas.workflows.sort()) {
        lines.push(`- [${file}](/v1/workflows/${file})`);
      }
      lines.push('');
    }

    if (schemas.runs.length > 0) {
      lines.push('### Runs');
      for (const file of schemas.runs.sort()) {
        lines.push(`- [${file}](/v1/runs/${file})`);
      }
      lines.push('');
    }
  }

  // Docs grouped by section
  lines.push('## Docs');
  const map = new Map<string, string[]>();

  for (const page of source.getPages()) {
    const section = getSection(page.slugs[0]);
    const list = map.get(section) ?? [];
    list.push(`- [${page.data.title}](${page.url}): ${page.data.description}`);
    map.set(section, list);
  }

  for (const [key, value] of map) {
    lines.push(`### ${key}`);
    lines.push(value.join('\n'));
    lines.push('');
  }

  return new Response(lines.join('\n'));
}
