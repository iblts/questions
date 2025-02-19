import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	env: {
		API_URL: 'http://localhost:3000/api',
		SECRET_KEY: 'iblts',
	},
}

export default nextConfig
