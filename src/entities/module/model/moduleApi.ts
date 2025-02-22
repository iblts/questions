'use server'

import { API_ROUTES, QUERY_KEYS } from '@/shared/constants'
import type { ModuleWithRelations } from '@/shared/types'
import type { Card } from '@prisma/client'
import { revalidateTag } from 'next/cache'

interface CreateModule {
	module: {
		title: string
		description?: string
		authorId: string
		private?: boolean
	}
	cards: Partial<Card>[]
}

export async function getModules() {
	try {
		const fetchedModules = await fetch(`${process.env.API_URL}/module`, {
			cache: 'force-cache',
			next: {
				revalidate: 120,
				tags: [QUERY_KEYS.MODULE],
			},
		})

		return (await fetchedModules.json()) as ModuleWithRelations[]
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message)
		}
	}
}

export async function getModule(id: string) {
	try {
		const fetchedModules = await fetch(`${API_ROUTES.MODULE}/${id}`, {
			cache: 'force-cache',
			next: {
				revalidate: 120,
			},
		})

		return (await fetchedModules.json()) as ModuleWithRelations
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message)
		}
	}
}

export async function createModule(data: CreateModule) {
	const fetchedModule = await fetch(API_ROUTES.MODULE, {
		method: 'POST',
		body: JSON.stringify(data),
	})

	return await fetchedModule.json()
}

export async function updateModule(id: string, data: CreateModule) {
	const updatedModule = await fetch(`${API_ROUTES.MODULE}/${id}`, {
		method: 'PUT',
		body: JSON.stringify(data),
	})

	revalidateTag(`${QUERY_KEYS.MODULE}${id}`)

	return await updatedModule.json()
}

export async function deleteModule(id: string) {
	await fetch(`${API_ROUTES.MODULE}/${id}`, {
		method: 'DELETE',
	})

	revalidateTag(QUERY_KEYS.MODULE)
}
