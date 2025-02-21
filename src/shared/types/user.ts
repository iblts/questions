import type { User } from '@prisma/client'
import type { ModuleWithRelations } from './module'

export interface UserWithRelations extends Omit<User, 'hashedPassword'> {
	modules: ModuleWithRelations[]
}
