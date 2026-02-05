import type { Metadata } from 'next';
import Link from 'next/link';
import { createMetadata, siteConfig } from '@/lib/metadata';
import WorldMap from '@/components/world-map';

export async function generateMetadata(): Promise<Metadata> {
  const image = {
    url: '/og',
    width: 1200,
    height: 630,
  };

  return createMetadata({
    openGraph: {
      url: '/',
      images: [image],
    },
    twitter: {
      images: [image],
    },
  });
}

export default function HomePage() {
  return (
    <div className="relative flex flex-col md:flex-row min-h-[calc(100vh-4rem)] md:min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <WorldMap />
        <div className="absolute inset-0 bg-linear-to-b from-background/95 via-background/85 to-background/98" />
      </div>

      {/* Left side: Logo + Title */}
      <div className="relative z-10 flex flex-col justify-center items-start px-8 md:px-16 lg:px-24 flex-1 py-12 md:py-0">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl md:text-xl lg:text-5xl font-bold font-mono">The Agentic OS Protocol</h1>
          <a
            href="https://synerops.com?utm_source=osp&utm_medium=website"
            target="_blank"
            className="text-sm font-heading text-muted-foreground"
            rel="noreferrer"
          >
            by SynerOps
          </a>
        </div>
      </div>

      {/* Vertical separator - hidden on mobile */}
      <div className="hidden w-px bg-border relative z-10" />
      {/* Horizontal separator - visible on mobile */}
      <div className="md:hidden w-full h-px bg-border my-8 relative z-10" />

      {/* Right side: Description + Link */}
      <div className="relative z-10 flex flex-col justify-center items-start px-8 md:px-16 lg:px-24 flex-1 pb-12 md:pb-0">
        <p className="text-lg md:text-xl text-muted-foreground max-w-md leading-relaxed mb-8">
          The standard for <span className="text-primary">multi-agent systems</span>. Define agents, coordinate
          workflows, and build systems where agents work together.
        </p>
        <Link href="/docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors underline">
          View Documentation →
        </Link>
      </div>
    </div>
  )
}

