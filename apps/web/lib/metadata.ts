import type { Metadata } from 'next';
import { deepMerge } from './utils';

export const baseUrl =
  process.env.NODE_ENV === 'development' || !process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? new URL('http://localhost:3000')
    : new URL(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`);

export const siteConfig = {
  name: 'OS Protocol',
  absoluteTitle: 'OS Protocol - The Agentic Operating System Protocol',
  description: 'The standard for multi-agent systems. Define agents, coordinate workflows, and build systems where agents work together.',
  keywords: [
    // Brand
    'OS Protocol',
    'OSP',
    'Agentic OS',
    // Core value
    'AI agent interoperability',
    'multi-agent systems',
    'agent protocol',
    // What it does
    'agent orchestration',
    'agent coordination',
    'agent specification',
    // Technical
    'standardized interfaces',
    'agent workflows',
    'LLM orchestration',
    'typescript',
    'AI SDK',
    'aisdk',
  ],
  authors: [
    {
      name: 'synerops',
      url: 'https://synerops.com',
    },
  ],
  creator: 'synerOps',
  twitterHandle: '@synerops',
  githubUrl: 'https://github.com/synerops/osprotocol',
};

/**
 * Creates base metadata for the site
 */
export function createBaseMetadata(): Metadata {
  return {
    title: {
      template: '%s | OS Protocol',
      absolute: siteConfig.absoluteTitle,
    },
    metadataBase: baseUrl,
    description: siteConfig.description,
    keywords: siteConfig.keywords,
    authors: siteConfig.authors,
    creator: siteConfig.creator,
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: baseUrl,
      title: siteConfig.name,
      description: siteConfig.description,
      siteName: siteConfig.name,
      images: [],
    },
    twitter: {
      card: 'summary_large_image',
      title: siteConfig.name,
      description: siteConfig.description,
      images: [],
      creator: siteConfig.twitterHandle,
    },
  };
}

/**
 * Creates metadata by merging base metadata with overrides
 * Overrides take priority over base values
 */
export function createMetadata(overrides?: Partial<Metadata>): Metadata {
  const base = createBaseMetadata();

  if (!overrides) {
    return base;
  }

  // Handle title specially - can be string or object with template
  if (overrides.title !== undefined) {
    base.title = overrides.title as Metadata['title'];
  }

  // Handle arrays - replace completely (no merge)
  if (overrides.keywords) {
    base.keywords = overrides.keywords;
  }
  if (overrides.authors) {
    base.authors = overrides.authors;
  }

  // Deep merge for nested objects like openGraph and twitter
  if (overrides.openGraph) {
    base.openGraph = deepMerge(base.openGraph || {}, overrides.openGraph);
  }

  if (overrides.twitter) {
    base.twitter = deepMerge(base.twitter || {}, overrides.twitter);
  }

  // Merge other properties (excluding arrays which are handled above)
  const merged = deepMerge(base, overrides);

  // Ensure arrays are replaced, not merged
  if (overrides.keywords) merged.keywords = overrides.keywords;
  if (overrides.authors) merged.authors = overrides.authors;

  return merged;
}
