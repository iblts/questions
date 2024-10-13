'use server'

import type { ModuleProgressWithRelations } from '@/types/moduleProgress'
import { redirect } from 'next/navigation'
import { getAuth } from '../auth/getAuth'
import { createModuleProgress } from './createModuleProgress'

export async function getModuleProgress(userId: string, moduleId: string) {
	const fetchedModules = await fetch(
		`${process.env.API_URL}/moduleProgress/module/${moduleId}/${userId}`
	)

	return await fetchedModules.json()
}

export async function getModule(
	id: string
): Promise<ModuleProgressWithRelations> {
	const { user } = await getAuth()

	if (!user) {
		redirect('/auth/login')
	}

	const moduleProgress: ModuleProgressWithRelations = await getModuleProgress(
		user.id,
		id
	)

	if (!moduleProgress) {
		return await createModuleProgress({
			moduleId: id,
			userId: user.id,
		})
	}

	return moduleProgress
}
