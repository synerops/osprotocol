import type { MetadataRoute } from 'next';
import { baseUrl } from '@/lib/metadata';
import { source } from '@/lib/source';

export const revalidate = false;

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string): string => new URL(path, baseUrl).toString();

  const pages = source.getPages().map((page) => ({
    url: url(page.url),
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }));

  return [
    {
      url: url('/'),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: url('/docs'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...pages,
  ];
}
