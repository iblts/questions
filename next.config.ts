import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	env: {
		API_URL:
			process.env.NODE_ENV === 'development'
				? 'http://localhost:3000/api/'
				: 'https://questions-blush.vercel.app/api/',
	},
}

export default nextConfig
