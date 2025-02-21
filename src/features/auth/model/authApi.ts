'use server'

import { API_ROUTES } from '@/shared/constants'
import type { ModuleWithRelations } from '@/shared/types'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const signOut = async () => {
	;(await cookies()).delete('access')

	redirect('/auth/login')
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

	;(await cookies()).set('access', data.accessToken)
}

export const signIn = async (login: string, password: string) => {
	console.log(API_ROUTES.LOGIN)
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
					: data.error
			)
		}

		const cookieStorage = await cookies()
		cookieStorage.set('access', data.accessToken)
	} catch (error) {
		console.error(error)
		throw error
	}
}

export const getAuth = async () => {
	const accessToken = (await cookies()).get('access')?.value

	if (!accessToken) return { id: null, login: null, modules: [] }

	const res = await fetch(API_ROUTES.AUTH_ME, {
		method: 'GET',
		headers: { Authorization: `Bearer ${accessToken}` },
	})

	const data = await res.json()
	if (!res.ok) {
		return { id: null, login: null, modules: [] }
	}
	return data as { id: string; login: string; modules: ModuleWithRelations[] }
}

export const refreshToken = async () => {
	const res = await fetch(API_ROUTES.REFRESH, {
		method: 'POST',
		credentials: 'include',
	})

	const data = await res.json()
	if (!res.ok) {
		throw new Error(data.error || 'Ошибка обновления токена')
	}
	;(await cookies()).set('access', data.accessToken)
}
