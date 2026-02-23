import type { Metadata } from 'next';
import Link from 'next/link';
import { Building, RefreshCw, Target } from 'lucide-react';
import { createMetadata } from '@/lib/metadata';
import WorldMap from '@/components/world-map';

export async function generateMetadata(): Promise<Metadata> {
  const image = {
    url: '/og',
    width: 1200,
    height: 630,
  };

  return createMetadata({
    alternates: {
      canonical: 'https://osprotocol.dev',
    },
    openGraph: {
      url: '/',
      images: [image],
    },
    twitter: {
      images: [image],
    },
  });
}

const domains = [
  {
    icon: Building,
    title: 'Infrastructure',
    subtitle: 'System',
    description: 'What do agents need?',
    href: '/docs/system',
  },
  {
    icon: RefreshCw,
    title: 'Autonomy',
    subtitle: 'Agent Loop',
    description: 'How do they think?',
    href: '/docs/concepts/agent-loop',
  },
  {
    icon: Target,
    title: 'Orchestration',
    subtitle: 'Workflows',
    description: 'How do they work together?',
    href: '/docs/workflows',
  },
];

export default function HomePage() {
  return (
    <div className="relative flex flex-col min-h-[calc(100vh-4rem)] md:min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <WorldMap />
        <div className="absolute inset-0 bg-linear-to-b from-background/95 via-background/85 to-background/98" />
      </div>

      <div className="relative z-10 flex flex-col justify-center items-center flex-1 px-8 py-16 md:py-24">
        {/* Title + by SynerOps */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-mono mb-3 text-balance">
            The Agentic OS Protocol
          </h1>
          <a
            href="https://synerops.com?utm_source=osp&utm_medium=website"
            target="_blank"
            className="text-sm font-heading text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
            rel="noreferrer"
          >
            by SynerOps
          </a>
        </div>

        {/* Tagline */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl text-center leading-relaxed mb-12 md:mb-16 text-balance">
          A protocol that defines how agents communicate, coordinate, and solve problems together.
          Like <span className="text-foreground">HTTP</span> for the web, or{' '}
          <span className="text-foreground">REST</span> for APIs—but for AI agents.
        </p>

        {/* Three Domains */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full max-w-4xl mb-12 md:mb-16">
          {domains.map((domain) => (
            <Link
              key={domain.title}
              href={domain.href}
              className="group flex flex-col items-center text-center p-6 rounded-lg border border-border/50 bg-background/50 backdrop-blur-sm hover:border-border hover:bg-background/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <domain.icon className="w-8 h-8 mb-4 text-muted-foreground group-hover:text-foreground transition-colors" strokeWidth={1.5} aria-hidden="true" />
              <h2 className="text-lg font-semibold text-foreground mb-0.5">{domain.title}</h2>
              <p className="text-xs text-muted-foreground/60 uppercase tracking-wider mb-3">{domain.subtitle}</p>
              <p className="text-sm text-muted-foreground">{domain.description}</p>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <Link
          href="/docs"
          className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium border border-border rounded-md bg-transparent hover:bg-accent hover:text-accent-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          View Documentation →
        </Link>
      </div>
    </div>
  );
}

