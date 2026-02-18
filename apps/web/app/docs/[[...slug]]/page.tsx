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
import { createMetadata, siteConfig } from '@/lib/metadata';
import { getMDXComponents } from '@/mdx-components';
import { PageCopy } from '@/components/page-copy';
import { PageNavigation } from '@/components/page-navigation';
import { KeyboardNavigation } from '@/components/keyboard-navigation';
import { cn } from '@/lib/utils';

export default async function Page(props: PageProps<'/docs/[[...slug]]'>) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const raw = await page.data.getText("raw");

  const neighbours = findNeighbour(source.pageTree, page.url);

  // Build URL for markdown: if it's index (empty slugs), use /docs/index.mdx
  // Otherwise, use /docs/[slug].mdx
  const markdownUrl = page.slugs.length === 0
    ? '/docs/index.mdx'
    : `${page.url}.mdx`;

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
    >
      <KeyboardNavigation
        previousUrl={neighbours.previous?.url ?? null}
        nextUrl={neighbours.next?.url ?? null}
      />
      {/* Header section: mobile-first vertical stack, desktop horizontal */}
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        {/* Title and description - takes full width on mobile, flex-1 on desktop */}
        <div className="flex-1 min-w-0">
          <DocsTitle className="font-heading leading-relaxed tracking-wide">{page.data.title}</DocsTitle>
          <DocsDescription>{page.data.description}</DocsDescription>
        </div>
        {/* Actions section: hidden on mobile (shown in fixed bar), visible on desktop */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          <PageCopy page={raw} url={markdownUrl} />
          <PageNavigation
            previous={neighbours.previous ?? null}
            next={neighbours.next ?? null}
          />
        </div>
      </div>
      <DocsBody className="pb-[calc(4.5rem+env(safe-area-inset-bottom))] md:pb-0">
        <MDX
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page),
            p: ({ className, ...props }: React.ComponentProps<"p">) => (
              <p
                className={cn(
                  "text-muted-foreground leading-relaxed not-first:mt-6",
                  className,
                )}
                {...props}
              />
            ),
            li: ({ className, ...props }: React.ComponentProps<"li">) => (
              <li
                className={cn(
                  "text-muted-foreground leading-relaxed not-first:mt-4",
                  className,
                )}
                {...props}
              />
            ),
          })}
        />
      </DocsBody>
      {/* Fixed mobile actions bar - only visible on mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/80 shadow-lg">
        <div className="flex items-center justify-center gap-2 max-w-screen-xl mx-auto px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
          <PageCopy page={raw} url={markdownUrl} />
          <PageNavigation
            previous={neighbours.previous ?? null}
            next={neighbours.next ?? null}
          />
        </div>
      </div>
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

  const image = {
    url: getPageImage(page).url,
    width: 1200,
    height: 630,
  };

  return createMetadata({
    title: page.data.title,
    description: page.data.description || siteConfig.description,
    alternates: {
      canonical: `https://osprotocol.dev/docs/${page.slugs.join('/')}`,
    },
    openGraph: {
      url: `https://osprotocol.dev/docs/${page.slugs.join('/')}`,
      images: [image],
    },
    twitter: {
      images: [image],
    },
  });
}
