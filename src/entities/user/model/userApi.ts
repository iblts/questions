import { API_ROUTES } from '@/shared/constants'
import type { UserWithRelations } from '@/shared/types'
import { fetchWithRefresh } from '@/shared/utils'

export async function getUser(userId: string) {
	const fetchedUser = (await fetchWithRefresh(
		`${API_ROUTES.USER}/${userId}`
	)) as UserWithRelations

	return fetchedUser
}
