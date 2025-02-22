'use server'

import { getAuth } from '@/features/auth'
import { API_ROUTES, QUERY_KEYS } from '@/shared/constants'
import { cookies } from 'next/headers'

interface CreateModuleProgress {
	moduleId: string
	userId: string
}

export async function createModuleProgress(data: CreateModuleProgress) {
	try {
		const fetchedModuleProgress = await fetch(API_ROUTES.MODULE_PROGRESS, {
			method: 'POST',
			body: JSON.stringify(data),
		})

		return await fetchedModuleProgress.json()
	} catch (error) {
		console.error('ERROR', error)
	}
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
			next: {
				tags: [`${QUERY_KEYS.MODULE}${moduleId}`],
			},
		}
	)

	if (!fetchedModules.ok) return undefined

	const moduleProgress = await fetchedModules.json()

	const user = await getAuth()

	if (!moduleProgress) {
		return await createModuleProgress({
			moduleId: moduleId,
			userId: user.id!,
		})
	}

	return moduleProgress
}
