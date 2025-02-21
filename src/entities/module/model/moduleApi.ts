import {
	createModuleProgress,
	getModuleProgress,
} from '@/entities/moduleProgress'
import { getAuth } from '@/features/auth'
import { API_ROUTES } from '@/shared/constants'
import type {
	ModuleProgressWithRelations,
	ModuleWithRelations,
} from '@/shared/types'
import type { Card } from '@prisma/client'

interface CreateModule {
	module: {
		title: string
		description?: string
		authorId: string
	}
	cards: Partial<Card>[]
}

export async function getModules() {
	try {
		const fetchedModules = await fetch(`${process.env.API_URL}/module`, {
			cache: 'force-cache',
		})

		return (await fetchedModules.json()) as ModuleWithRelations[]
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message)
		}
	}
}

export async function getModule(
	id: string
): Promise<ModuleProgressWithRelations> {
	const moduleProgress: ModuleProgressWithRelations = await getModuleProgress(
		id
	)

	const user = await getAuth()

	if (!moduleProgress) {
		return await createModuleProgress({
			moduleId: id,
			userId: user.id!,
		})
	}

	return moduleProgress
}

export async function createModule(data: CreateModule) {
	const fetchedModule = await fetch(API_ROUTES.MODULE, {
		method: 'POST',
		body: JSON.stringify(data),
	})

	return await fetchedModule.json()
}
