import withBundleAnalyzer from '@next/bundle-analyzer';

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
    ],
  },
  transpilePackages: ['next-mdx-remote'],
  async redirects() {
    return [
      // {
      //   source: '/atom',
      //   destination: '/feed.xml',
      //   permanent: true,
      // },
      // {
      //   source: '/feed',
      //   destination: '/feed.xml',
      //   permanent: true,
      // },
      // {
      //   source: '/rss',
      //   destination: '/feed.xml',
      //   permanent: true,
      // },
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
    ];
  },
};

export default nextConfig;
