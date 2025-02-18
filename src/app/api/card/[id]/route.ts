import prisma from '@/shared/lib/prisma'
import type { NextRequest } from 'next/server'

export async function PUT(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	if (!request.body) {
		throw new Error('Не передано тело запроса')
	}

	const { id } = params
	const data = await request.json()

	if (!data) throw new Error('Неверное тело запроса')

	try {
		const updatedCard = await prisma.card.update({
			where: { id },
			data,
		})

		return Response.json(updatedCard)
	} catch (error) {
		throw error
	}
}

export async function DELETE(
	request: NextRequest,
	{ params }: { params: { cardId: string } }
) {
	const { cardId } = params

	try {
		await prisma.$transaction(async tx => {
			await tx.cardProgress.deleteMany({
				where: { cardId },
			})

			const deletedCard = await tx.card.delete({
				where: { id: cardId },
			})

			return Response.json(deletedCard)
		})
	} catch (error) {
		console.error(error)
		return Response.error()
	}
}
