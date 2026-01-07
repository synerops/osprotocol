import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from 'next/og';
import { OGImage } from '@/components/og';
import { siteConfig } from '@/lib/metadata';

export const revalidate = false;

async function loadFonts() {
  const [ jetbrainsMono, workSans ] = await Promise.all([
    readFile(
      join(process.cwd(), 'public', 'fonts', 'JetBrainsMono-Regular.ttf')
    ).then((buffer) => buffer.buffer),

    readFile(
      join(process.cwd(), 'public', 'fonts', 'WorkSans-Regular.ttf')
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
      name: 'Work Sans',
      data: workSans,
      style: 'normal' as const,
      weight: 400 as const,
    },
  ]
}

export async function GET() {
  return new ImageResponse(
    <OGImage
      title={siteConfig.absoluteTitle}
      description={siteConfig.description}
      site="os://protocol"
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

