import { source } from '@/lib/source';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const revalidate = false;

export async function GET(
  _req: Request,
  { params }: RouteContext<'/api/docs/markdown/[[...slug]]'>
) {
  const { slug } = await params;
  const page = source.getPage(slug);

  if (!page) {
    notFound();
  }

  const processed = await page.data.getText("processed");

  return new Response(processed, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Content-Disposition': `inline; filename="${page.data.title}.mdx"`,
    },
  });
}

