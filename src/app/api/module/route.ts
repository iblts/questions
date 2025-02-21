import prisma from '@/shared/lib/prisma'
import { Card } from '@prisma/client'
import type { NextRequest } from 'next/server'

export async function GET() {
	const modules = await prisma.module.findMany({
		where: {
			cards: {
				some: {},
			},
			private: false,
		},
		include: {
			cards: true,
			author: {
				select: {
					login: true,
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

	const data = await request.json()

	if (!data.module || !data.cards) throw new Error('Неверное тело запроса')

	try {
		const createdModule = await prisma.module.create({
			data: data.module,
			include: {
				author: true,
			},
		})

		await prisma.card.createMany({
			data: data.cards.map((card: Card) => ({
				...card,
				moduleId: createdModule.id,
			})),
		})

		return Response.json(createdModule)
	} catch (error) {
		throw error
	}
}
