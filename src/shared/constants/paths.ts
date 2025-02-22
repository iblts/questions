const API_URL = process.env.API_URL

export const API_ROUTES = {
	LOGIN: `${API_URL}/auth/login`,
	REGISTER: `${API_URL}/auth/register`,
	AUTH_ME: `${API_URL}/auth/user`,
	REFRESH: `${API_URL}/auth/refresh`,
	MODULE: `${API_URL}/module`,
	MODULE_PROGRESS: `${API_URL}/moduleProgress`,
	CARD: `${API_URL}/card`,
	USER: `${API_URL}/user`,
} as const

export const ROUTES = {
	HOME: '/',
	LOGIN: '/auth/login',
	REGISTER: '/auth/register',
	CREATE: '/create',
	MODULE: '/module',
	EDIT: '/edit',
	PROFILE: '/profile',
	SETTINGS: '/profile/settings',
	MY_MODULES: '/profile/modules',
} as const
