import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { source } from '@/lib/source';
import { baseOptions } from '@/lib/layout.shared';
import { DocsGridBackground } from '@/components/docs-grid-background';

export default function Layout({ children }: LayoutProps<'/docs'>) {
  return (
    <div className="relative">
      <DocsGridBackground />
      <DocsLayout
        tree={source.getPageTree()}
        {...baseOptions()}
      >
        {children}
      </DocsLayout>
    </div>
  );
}
