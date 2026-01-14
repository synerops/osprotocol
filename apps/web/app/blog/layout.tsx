import type { ReactNode } from 'react';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { blog } from '@/lib/source';
import { baseOptions } from '@/lib/layout.shared';
import { DocsGridBackground } from '@/components/docs-grid-background';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      <DocsGridBackground />
      <DocsLayout
        tree={blog.getPageTree()}
        {...baseOptions()}
      >
        {children}
      </DocsLayout>
    </div>
  );
}
