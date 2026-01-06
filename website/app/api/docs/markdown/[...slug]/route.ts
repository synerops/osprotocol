import { source } from '@/lib/source';
import { notFound } from 'next/navigation';

export const revalidate = false;

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;
  // If slug is ['index'], treat it as empty array to get the index page
  const actualSlug = slug.length === 1 && slug[0] === 'index' ? [] : slug;
  const page = source.getPage(actualSlug);
  
  if (!page) {
    notFound();
  }

  const raw = await page.data.getText("raw");

  return new Response(raw, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Content-Disposition': `inline; filename="${page.data.title}.md"`,
    },
  });
}

export async function generateStaticParams() {
  return source.generateParams();
}

