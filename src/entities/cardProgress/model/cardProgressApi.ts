'use server'

import { API_ROUTES, QUERY_KEYS } from '@/shared/constants'
import { CardProgressWithRelations } from '@/shared/types'
import { fetchWithRefresh } from '@/shared/utils'
import { getHeaders } from '@/shared/utils/getHeaders'
import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'

export const getCardProgressByModuleId = async (moduleId: string) => {
	const cookieStore = await cookies()

	const headers: HeadersInit = {
		Authorization: `Bearer ${cookieStore.get('access')?.value}`,
	}

	const cardProgress = await fetchWithRefresh(
		`${API_ROUTES.CARD_PROGRESS}/${moduleId}`,
		{
			headers,
			next: {
				tags: [QUERY_KEYS.CARD_PROGRESS],
			},
		}
	)

	return cardProgress
}

export const updateCardProgress = async (
	cardId: string,
	data: Partial<CardProgressWithRelations>
) => {
	try {
		const cardProgress = await fetchWithRefresh(
			`${API_ROUTES.CARD_PROGRESS}/${cardId}`,
			{
				method: 'PUT',
				headers: await getHeaders(),
				body: JSON.stringify(data),
			}
		)

		revalidateTag(QUERY_KEYS.CARD_PROGRESS)

		return cardProgress as CardProgressWithRelations
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.stack)
		} else {
			console.error(error)
		}
	}
}

export const resetCardsProgressStages = async (
	data: CardProgressWithRelations[]
) => {
	const cookieStore = await cookies()

	const headers: HeadersInit = {
		Authorization: `Bearer ${cookieStore.get('access')?.value}`,
	}

	await fetchWithRefresh(
		API_ROUTES.RESET_CARD_PROGRESS(data[0].card.moduleId),
		{
			method: 'PUT',
			headers,
			next: {
				tags: [QUERY_KEYS.CARD_PROGRESS],
			},
			body: JSON.stringify(data),
		}
	)
}
