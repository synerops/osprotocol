import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Intercept URLs ending in .md within /docs
  if (pathname.startsWith('/docs') && pathname.endsWith('.md')) {
    let slugArray: string[] = [];
    
    if (pathname === '/docs.md' || pathname === '/docs/index.md') {
      // Special case: index page - use 'index' as slug
      slugArray = ['index'];
    } else if (pathname.startsWith('/docs/')) {
      // Remove /docs/ and .md to get the slug
      const slug = pathname.replace('/docs/', '').replace('.md', '');
      slugArray = slug ? slug.split('/') : [];
    }
    
    // Rewrite to the API route that will handle the markdown
    const url = request.nextUrl.clone();
    url.pathname = `/api/docs/markdown/${slugArray.join('/')}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/docs.md', '/docs/:path*.md'],
};

