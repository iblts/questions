'use server'

import { API_ROUTES, QUERY_KEYS } from '@/shared/constants'
import type { Card } from '@prisma/client'
import { revalidateTag } from 'next/cache'

export async function updateCard(id: string, data: Partial<Card>) {
	const updatedCard = await fetch(`${API_ROUTES.CARD}/${id}`, {
		method: 'PUT',
		body: JSON.stringify(data),
	})

	revalidateTag(QUERY_KEYS.MODULE)

	return await updatedCard.json()
}
