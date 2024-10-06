import { ModuleWithRelations } from '@/types/module'
import type { User } from '@prisma/client'

interface UserWithRelations extends User {
	modules: ModuleWithRelations[]
}

export async function getUser(userId: string) {
	const fetchedUser = await fetch(`${process.env.API_URL}/user/${userId}`)

	return (await fetchedUser.json()) as UserWithRelations
}
