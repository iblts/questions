import prisma from '@/lib/prisma'
import type { NextRequest } from 'next/server'

export async function GET() {
	const modules = await prisma.moduleProgress.findMany({
		include: {
			module: true,
			cardProgress: {
				include: {
					card: true,
				},
			},
		},
	})

	return Response.json(modules)
}

export async function POST(request: NextRequest) {
	if (!request.body) {
		throw new Error('Не передано тело запроса')
	}

	const data: {
		id: string
		cards: { id: string; termin: string; definition: string }[]
	} = await request.json()

	if (!data.id) throw new Error('Неверное тело запроса')

	try {
		const createdModule = await prisma.moduleProgress.create({
			data: {
				moduleId: data.id,
				cardProgress: {
					createMany: {
						data: data.cards.map(card => ({
							cardId: card.id,
						})),
					},
				},
			},
		})

		return Response.json(
			await prisma.moduleProgress.findFirst({ where: { id: createdModule.id } })
		)
	} catch (error) {
		throw error
	}
}
