import { UserWithRelations } from '@/types/user'

export async function getUser(userId: string) {
	const fetchedUser = await fetch(`${process.env.API_URL}/user/${userId}`)

	return (await fetchedUser.json()) as UserWithRelations
}
