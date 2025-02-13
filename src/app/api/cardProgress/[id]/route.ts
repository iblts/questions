import prisma from '@/shared/lib/prisma'
import type { NextRequest } from 'next/server'

export async function GET(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	const { id } = params

	try {
		const findedCard = await prisma.cardProgress.findFirst({
			where: { id },
			include: {
				card: true,
			},
		})

		return Response.json(findedCard)
	} catch (error) {
		throw error
	}
}

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
		const updatedCard = await prisma.cardProgress.update({
			where: { id },
			data,
		})

		return Response.json(updatedCard)
	} catch (error) {
		throw error
	}
}
