import Link from 'next/link';
import Image from 'next/image';
import LogoDark from 'public/logo-dark.svg';
import LogoLight from 'public/logo-light.svg';

export default function HomePage() {
  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)] md:min-h-screen w-full">
      {/* Left side: Logo + Title */}
      <div className="flex flex-col justify-center items-start px-8 md:px-16 lg:px-24 flex-1 py-12 md:py-0">
        <div className="flex items-center gap-4">
          <Image
            alt="OSP logo"
            src={LogoDark}
            className="hidden dark:block w-12 h-12"
            aria-label="OSP logo"
          />
          <Image
            alt="OSP logo"
            src={LogoLight}
            className="block dark:hidden w-12 h-12"
            aria-label="OSP logo"
          />
          <h1 className="text-4xl md:text-xl lg:text-5xl font-bold font-mono">
            Agent OS Protocol
          </h1>
        </div>
      </div>

      {/* Vertical separator - hidden on mobile */}
      <div className="hidden md:block w-px bg-border" />
      {/* Horizontal separator - visible on mobile */}
      <div className="md:hidden w-full h-px bg-border my-8" />

      {/* Right side: Description + Link */}
      <div className="flex flex-col justify-center items-start px-8 md:px-16 lg:px-24 flex-1 pb-12 md:pb-0">
        <p className="text-lg md:text-xl text-muted-foreground max-w-md leading-relaxed mb-8">
          A protocol for orchestrating, managing, and executing <span className="text-primary">AI agents</span> in distributed, scalable environments.
        </p>
        <Link
          href="/docs"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors font-mono underline"
        >
          View Documentation →
        </Link>
      </div>
    </div>
  );
}
