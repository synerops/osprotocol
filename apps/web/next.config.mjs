import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,

  async rewrites() {
    return [
      {
        source: '/docs/:path*.mdx',
        destination: '/api/docs/markdown/:path*',
      },
      {
        source: '/blog/:path*.mdx',
        destination: '/api/blog/markdown/:path*',
      },
    ];
  },
};

export default withMDX(config);
