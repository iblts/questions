import { API_ROUTES } from '@/shared/constants'
import type { UserWithRelations } from '@/shared/types'

export async function getUser(userId: string) {
	const fetchedUser = await fetch(`${API_ROUTES.USER}/${userId}`)

	return (await fetchedUser.json()) as UserWithRelations
}
