'use server'

import { getAuth } from '@/features/auth'
import { API_ROUTES, QUERY_KEYS } from '@/shared/constants'
import { fetchWithRefresh } from '@/shared/utils'
import { cookies } from 'next/headers'

interface CreateModuleProgress {
	moduleId: string
	userId: string
}

export async function createModuleProgress(data: CreateModuleProgress) {
	try {
		const moduleProgress = await fetchWithRefresh(API_ROUTES.MODULE_PROGRESS, {
			method: 'POST',
			body: JSON.stringify(data),
		})

		return moduleProgress
	} catch (error) {
		console.error('ERROR', error)
	}
}

export async function getModuleProgress(moduleId: string) {
	const cookieStore = await cookies()

	const headers: HeadersInit = {
		Authorization: `Bearer ${cookieStore.get('access')?.value}`,
	}

	const moduleProgress = await fetchWithRefresh(
		`${API_ROUTES.MODULE_PROGRESS}/${moduleId}`,
		{
			headers,
			next: {
				tags: [QUERY_KEYS.MODULE],
			},
		}
	)

	if (!moduleProgress) {
		const user = await getAuth()

		return await createModuleProgress({
			moduleId: moduleId,
			userId: user.id!,
		})
	}

	return moduleProgress
}
