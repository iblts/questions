'use server'

import { API_ROUTES } from '@/shared/constants'
import { cookies } from 'next/headers'

interface CreateModuleProgress {
	moduleId: string
	userId: string
}

export async function createModuleProgress(data: CreateModuleProgress) {
	const fetchedModuleProgress = await fetch(API_ROUTES.MODULE_PROGRESS, {
		method: 'POST',
		body: JSON.stringify(data),
	})

	return await fetchedModuleProgress.json()
}

export async function getModuleProgress(moduleId: string) {
	const cookieStore = await cookies()

	const headers: HeadersInit = {
		Authorization: `Bearer ${cookieStore.get('access')?.value}`,
	}

	const fetchedModules = await fetch(
		`${API_ROUTES.MODULE_PROGRESS}/${moduleId}`,
		{
			headers,
		}
	)

	if (!fetchedModules.ok) return undefined

	return await fetchedModules.json()
}
