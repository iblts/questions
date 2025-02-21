import type { Card, CardProgress } from '@prisma/client'

export interface CardProgressWithRelations extends CardProgress {
	card: Card
}
