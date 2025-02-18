import prisma from '@/shared/lib/prisma'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET() {
	const modules = await prisma.moduleProgress.findMany({
		include: {
			module: {
				include: {
					cards: true,
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
		await prisma.$transaction(async tx => {
			await tx.moduleProgress.create({
				data: {
					moduleId: data.moduleId,
					userId: data.userId,
				},
			})

			const cards = await tx.card.findMany({
				where: { moduleId: data.moduleId },
				select: { id: true },
			})

			const cardProgressData = cards.map(card => ({
				userId: data.userId,
				cardId: card.id,
				stage: 1,
			}))

			await tx.cardProgress.createMany({
				data: cardProgressData,
			})

			const moduleProgress = prisma.moduleProgress.findFirst({
				where: {
					moduleId: data.moduleId,
					userId: data.userId,
				},
			})

			return NextResponse.json(moduleProgress)
		})
	} catch (error) {
		if (error instanceof Error) {
			console.log('Error: ', error.stack)
			return NextResponse.json({ message: error.message }, { status: 400 })
		}
	}
}
