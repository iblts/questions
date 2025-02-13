import prisma from '@/shared/lib/prisma'
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
		moduleId: string
		userId: string
	} = await request.json()

	if (!data.moduleId) throw new Error('Неверное тело запроса')

	try {
		const currentModule = await prisma.module.findFirst({
			where: {
				id: data.moduleId,
			},
			include: {
				cards: true,
			},
		})

		if (!currentModule) throw new Error('Модуль не существует')

		const createdModule = await prisma.moduleProgress.create({
			data: {
				moduleId: data.moduleId,
				cardProgress: {
					createMany: {
						data: currentModule.cards.map(card => ({ cardId: card.id })),
					},
				},
				userId: data.userId,
			},
			include: {
				module: true,
				cardProgress: {
					include: {
						card: true,
					},
				},
				user: true,
			},
		})

		return Response.json(createdModule)
	} catch (error) {
		throw error
	}
}
