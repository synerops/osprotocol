import { NextRequest, NextResponse } from 'next/server';
import { isMarkdownPreferred, rewritePath } from 'fumadocs-core/negotiation';

// Rewrite /docs/*path to /api/docs/markdown/*path when markdown is preferred
const { rewrite: rewriteMarkdown } = rewritePath('/docs/*path', '/api/docs/markdown/*path');

export default function proxy(request: NextRequest) {
  if (isMarkdownPreferred(request)) {
    const result = rewriteMarkdown(request.nextUrl.pathname);

    if (result) {
      return NextResponse.rewrite(new URL(result, request.nextUrl));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/docs/:path*'],
};

