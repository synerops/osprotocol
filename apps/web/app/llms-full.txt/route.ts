import { getLLMText, source } from '@/lib/source';
import { siteConfig } from '@/lib/metadata';

export const revalidate = false;

export async function GET() {
  const lines: string[] = [];

  // Header consistent with llms.txt
  lines.push(`# ${siteConfig.name}`);
  lines.push('');
  lines.push(`> ${siteConfig.description}`);
  lines.push('');
  lines.push('---');
  lines.push('');

  // Full content of all pages
  const scan = source.getPages().map(getLLMText);
  const scanned = await Promise.all(scan);
  lines.push(scanned.join('\n\n---\n\n'));

  return new Response(lines.join('\n'));
}
