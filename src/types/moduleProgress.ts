import type { ModuleProgress } from '@prisma/client'
import type { CardProgressWithRelations } from './cardProgress'
import type { ModuleWithRelations } from './module'

export interface ModuleProgressWithRelations extends ModuleProgress {
	module: ModuleWithRelations
	cardProgress: CardProgressWithRelations[]
}
