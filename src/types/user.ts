import { User } from '@prisma/client'
import { ModuleWithRelations } from './module'

export interface UserWithRelations extends User {
	modules: ModuleWithRelations[]
}
