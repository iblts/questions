import prisma from '@/shared/lib/prisma'
import type { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
	if (!request.body) {
		throw new Error('Не передано тело запроса')
	}

	const data = await request.json()

	if (data.length && data.length < 1) throw new Error('Неверное тело запроса')

	try {
		await prisma.$transaction(async tx => {
			const newCard = await tx.card.create({
				data,
			})

			const moduleUsers = await tx.moduleProgress.findMany({
				where: { moduleId: newCard.moduleId },
				select: { userId: true },
			})

			const progressData = moduleUsers.map(({ userId }) => ({
				userId,
				cardId: newCard.id,
				stage: 1,
			}))

			await tx.cardProgress.createMany({
				data: progressData,
			})
		})
	} catch (error) {
		throw error
	}
}
