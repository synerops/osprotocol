import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { notFound } from 'next/navigation';
import { ImageResponse } from 'next/og';
import { getPageImage, source } from '@/lib/source';
import { OGImage } from '@/components/og';

export const revalidate = false;

async function loadFonts() {
  const [ jetbrainsMono, lexend, zain ] = await Promise.all([
    readFile(
      join(process.cwd(), 'public', 'fonts', 'JetBrainsMono-Regular.ttf')
    ).then((buffer) => buffer.buffer),

    readFile(
      join(process.cwd(), 'public', 'fonts', 'Lexend-Regular.ttf')
    ).then((buffer) => buffer.buffer),

    readFile(
      join(process.cwd(), 'public', 'fonts', 'Zain-Regular.ttf')
    ).then((buffer) => buffer.buffer),
  ]);

  return [
    {
      name: 'JetBrains Mono',
      data: jetbrainsMono,
      style: 'normal' as const,
      weight: 400 as const,
    },
    {
      name: 'Lexend',
      data: lexend,
      style: 'normal' as const,
      weight: 400 as const,
    },
    {
      name: 'Zain',
      data: zain,
      style: 'normal' as const,
      weight: 400 as const,
    },
  ]
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;

  const page = source.getPage(slug.slice(0, -1));
  if (!page) notFound();

  return new ImageResponse(
    <OGImage
      title={page.data.title}
      description={page.data.description || 'The Agentic Operating System Protocol'}
      site="os://protocol"
      icon={page.data.icon}
      primaryColor="#0c0a09"
      primaryTextColor="#1570ef"
    />,
    {
      width: 1200,
      height: 630,
      fonts: await loadFonts(),
    },
  );
}

export function generateStaticParams() {
  return source.getPages().map((page) => ({
    lang: page.locale,
    slug: getPageImage(page).segments,
  }));
}
