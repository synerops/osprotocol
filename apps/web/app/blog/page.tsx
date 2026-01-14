import type { Metadata } from 'next';
import Link from 'next/link';
import { blog } from '@/lib/source';
import { createMetadata, siteConfig } from '@/lib/metadata';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardContent,
} from '@/components/ui/card';
import { ArrowRight, Calendar, User } from 'lucide-react';

export async function generateMetadata(): Promise<Metadata> {
  return createMetadata({
    title: 'Blog',
    description: `Latest posts and updates from ${siteConfig.name}`,
  });
}

function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
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
    <div className="flex flex-col gap-12 py-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Blog</h1>
        <p className="text-muted-foreground text-lg">
          Latest posts and updates from {siteConfig.name}
        </p>
      </div>

      {sortedPosts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No blog posts yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sortedPosts.map((post) => {
            const date = post.data.date ? formatDate(post.data.date) : null;

            return (
              <Link
                key={post.url}
                href={post.url}
                className="group block h-full"
              >
                <Card className="h-full transition-all duration-200 hover:shadow-lg hover:border-primary/20">
                  <CardHeader className="space-y-3">
                    <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2">
                      {post.data.title}
                    </CardTitle>
                    {post.data.description && (
                      <CardDescription className="line-clamp-3 text-base">
                        {post.data.description}
                      </CardDescription>
                    )}
                  </CardHeader>

                  <CardContent className="flex-1" />

                  <CardFooter className="flex flex-col items-start gap-3 pt-0">
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground w-full">
                      {post.data.author && (
                        <div className="flex items-center gap-1.5">
                          <User className="h-3.5 w-3.5" />
                          <span>{post.data.author}</span>
                        </div>
                      )}
                      {date && (
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          <time dateTime={typeof post.data.date === 'string' ? post.data.date : post.data.date?.toISOString()}>
                            {date}
                          </time>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                      Read more
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
