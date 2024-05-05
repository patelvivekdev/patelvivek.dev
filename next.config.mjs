import withBundleAnalyzer from '@next/bundle-analyzer';

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    ppr: true,
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'patelvivek.dev',
        port: '',
        pathname: '/static/media/**',
      },
      {
        hostname: 'github-profile-summary-cards.vercel.app',
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
  // headers() {
  //   return [
  //     {
  //       source: '/(.*)',
  //       headers: securityHeaders,
  //     },
  //   ];
  // },
};

// const securityHeaders = [
//   {
//     key: 'X-DNS-Prefetch-Control',
//     value: 'on',
//   },
//   {
//     key: 'Strict-Transport-Security',
//     value: 'max-age=31536000; includeSubDomains; preload',
//   },
// ];

export default nextConfig;
