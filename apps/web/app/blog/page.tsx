import type { Metadata } from 'next';
import Link from 'next/link';
import { blog } from '@/lib/source';
import { createMetadata, siteConfig } from '@/lib/metadata';
import { cn } from '@/lib/utils';

export async function generateMetadata(): Promise<Metadata> {
  return createMetadata({
    title: 'Blog',
    description: `Latest posts and updates from ${siteConfig.name}`,
  });
}

export default function BlogPage() {
  const posts = blog.getPages();

  // Sort posts by date (most recent first)
  const sortedPosts = [...posts].sort((a, b) => {
    const dateA = a.data.date ? new Date(a.data.date).getTime() : 0;
    const dateB = b.data.date ? new Date(b.data.date).getTime() : 0;
    return dateB - dateA;
  });

  return (
    <div className="flex flex-col gap-8 py-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Blog</h1>
        <p className="text-muted-foreground">
          Latest posts and updates from {siteConfig.name}
        </p>
      </div>

      {sortedPosts.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p>No blog posts yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sortedPosts.map((post) => {
            const date = post.data.date
              ? new Date(post.data.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              : null;

            return (
              <Link
                key={post.url}
                href={post.url}
                className={cn(
                  'block p-6 rounded-lg border border-border',
                  'bg-card hover:bg-accent/50 transition-colors',
                  'hover:border-primary/50'
                )}
              >
                <h2 className="text-xl font-semibold mb-2">{post.data.title}</h2>
                {post.data.description && (
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {post.data.description}
                  </p>
                )}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  {post.data.author && (
                    <span>By {post.data.author}</span>
                  )}
                  {date && <span>• {date}</span>}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
