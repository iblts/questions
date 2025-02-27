import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
	env: {
		API_URL:
			process.env.NODE_ENV === 'development'
				? 'http://localhost:3000/api/'
				: 'https://questions-blush.vercel.app/api/',
	},
	sassOptions: {
		includePaths: [path.join(__dirname, 'src/shared/styles')],
	},
}

export default nextConfig
