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
  headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

const ContentSecurityPolicy = `
    default-src 'self' vercel.live;
    script-src 'self' 'unsafe-eval' 'unsafe-inline' cdn.vercel-insights.com vercel.live va.vercel-scripts.com;
    style-src 'self' 'unsafe-inline';
    img-src * blob: data:;
    media-src 'none';
    connect-src *;
    font-src 'self' data:;
`;

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\n/g, ''),
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
];

export default nextConfig;
