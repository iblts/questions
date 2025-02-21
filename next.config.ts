import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	env: {
		API_URL: 'https://questions-blush.vercel.app/api/',
		SECRET_KEY: 'iblts',
	},
}

export default nextConfig
