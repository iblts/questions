/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		API_URL: 'http://localhost:3000/api',
		SECRET_KEY: 'iblts',
	},
	webpack: config => {
		config.externals.push('@node-rs/argon2', '@node-rs/bcrypt')
		return config
	},
}

export default nextConfig
