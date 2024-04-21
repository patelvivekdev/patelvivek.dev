/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    ppr: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'patelvivek.dev',
        port: '',
        pathname: '/static/media/**',
      },
      {
        hostname: 'firebasestorage.googleapis.com',
      },
    ],
  },
  transpilePackages: ['next-mdx-remote'],
  async redirects() {
    return [
      {
        source: '/atom',
        destination: '/feed.xml',
        permanent: true,
      },
      {
        source: '/feed',
        destination: '/feed.xml',
        permanent: true,
      },
      {
        source: '/rss',
        destination: '/feed.xml',
        permanent: true,
      },
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/Project',
        destination: '/projects',
        permanent: true,
      },
      {
        source: '/resume',
        destination: '/Vivek-Resume.pdf',
        permanent: true,
      },
      // changed slugs for blog posts
      {
        source: '/blog/first-blog',
        destination: '/blog/hello-world',
        permanent: true,
      },
      {
        source: '/blog/second-blog',
        destination: '/blog/hello-world',
        permanent: true,
      },
      {
        source: '/blog/third-blog',
        destination: '/blog/hello-world',
        permanent: true,
      },
      {
        source: '/projects/1',
        destination: '/projects/market-hub',
        permanent: true,
      },
      {
        source: '/projects/first-project',
        destination: '/projects/market-hub',
        permanent: true,
      },
      {
        source: '/projects/2',
        destination: '/projects/acme-auth',
        permanent: true,
      },
      {
        source: '/projects/second-project',
        destination: '/projects/acme-auth',
        permanent: true,
      },
      {
        source: '/projects/3',
        destination: '/projects/nextjs-blog',
        permanent: true,
      },
      {
        source: '/projects/third-project',
        destination: '/projects/nextjs-blog',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
