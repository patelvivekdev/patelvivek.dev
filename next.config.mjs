/** @type {import('next').NextConfig} */
const nextConfig = {
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
}

export default nextConfig
