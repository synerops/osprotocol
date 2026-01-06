import type { Metadata } from 'next';
import { 
  DocsBody, 
  DocsDescription, 
  DocsPage, 
  DocsTitle 
} from 'fumadocs-ui/layouts/docs/page';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { findNeighbour } from 'fumadocs-core/page-tree';
import { notFound } from 'next/navigation';
import { getPageImage, source } from '@/lib/source';
import { getMDXComponents } from '@/mdx-components';
import { PageCopy } from '@/components/page-copy';
import { PageNavigation } from '@/components/page-navigation';

export default async function Page(props: PageProps<'/docs/[[...slug]]'>) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const raw = await page.data.getText("raw");

  const neighbours = findNeighbour(source.pageTree, page.url);

  // Build URL for markdown: if it's index (empty slugs), use /docs/index.md
  // Otherwise, use /docs/[slug].md
  const markdownUrl = page.slugs.length === 0 
    ? '/docs/index.md'
    : `${page.url}.md`;

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <DocsTitle>{page.data.title}</DocsTitle>
          <DocsDescription>{page.data.description}</DocsDescription>
        </div>
        <PageCopy page={raw} url={markdownUrl} />
        <PageNavigation 
          previous={neighbours.previous ?? null} 
          next={neighbours.next ?? null} 
        />
      </div>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: PageProps<'/docs/[[...slug]]'>): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: getPageImage(page).url,
    },
  };
}
