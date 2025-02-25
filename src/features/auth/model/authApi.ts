'use server'

import { API_ROUTES } from '@/shared/constants'
import type { ModuleWithRelations } from '@/shared/types'
import { fetchWithRefresh } from '@/shared/utils'
import { cookies } from 'next/headers'

export const signOut = async () => {
	;(await cookies()).delete('access')
}

export const signUp = async (login: string, password: string) => {
	const res = await fetch(API_ROUTES.REGISTER, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ login, password }),
	})

	const data = await res.json()
	if (!res.ok) {
		throw new Error(data.error || 'Ошибка регистрации')
	}

	const cookieStorage = await cookies()
	cookieStorage.set('access', data.accessToken)
	cookieStorage.set('refreshToken', data.refreshToken, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		path: '/',
		maxAge: 7 * 24 * 60 * 60,
	})
}

export const signIn = async (login: string, password: string) => {
	try {
		const res = await fetch(API_ROUTES.LOGIN, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ login, password }),
		})

		const data = await res.json()
		if (!res.ok) {
			throw new Error(
				data.error === 'Неверные креденшелы'
					? 'Неверные логин или пароль'
					: 'Ошибка при авторизации'
			)
		}

		const cookieStorage = await cookies()
		cookieStorage.set('access', data.accessToken)
		cookieStorage.set('refreshToken', data.refreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			path: '/',
			maxAge: 7 * 24 * 60 * 60,
		})
	} catch (error) {
		console.error(error)
		throw error
	}
}

export const getAuth = async () => {
	const cookieStore = await cookies()
	const accessToken = cookieStore.get('access')?.value

	if (!accessToken) return { id: null, login: null, modules: [] }

	try {
		const res = await fetchWithRefresh(API_ROUTES.AUTH_ME, {
			method: 'GET',
			headers: { Authorization: `Bearer ${accessToken}` },
		})
		return res as { id: string; login: string; modules: ModuleWithRelations[] }
	} catch (error) {
		console.error(error)
		return { id: null, login: null, modules: [] }
	}
}

export const refreshToken = async () => {
	const cookieStore = await cookies()
	const refreshToken = cookieStore.get('refreshToken')?.value
	console.log('RefreshToken from cookies:', refreshToken)
	if (!refreshToken) {
		throw new Error('Refresh токен отсутсвует')
	}

	const res = await fetch(API_ROUTES.REFRESH, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ refreshToken }),
	})

	const data = await res.json()
	if (!res.ok) {
		throw new Error(data.error || 'Ошибка обновления токена')
	}
	cookieStore.set('access', data.accessToken)
}
