import type { Card } from '@prisma/client'

interface CreateModule {
	module: {
		title: string
		description: string
		authorId: string
	}
	cards: Partial<Card>[]
}

export async function createModule(data: CreateModule) {
	const fetchedModule = await fetch(`${process.env.API_URL}/module`, {
		method: 'POST',
		body: JSON.stringify(data),
	})

	return await fetchedModule.json()
}
