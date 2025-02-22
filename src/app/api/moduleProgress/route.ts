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
	try {
		if (!request.body) {
			return NextResponse.json(
				{ error: 'Не передано тело запроса' },
				{ status: 400 }
			)
		}

		const data: {
			moduleId: string
			userId: string
		} = await request.json()

		if (!data.moduleId) {
			return NextResponse.json(
				{ error: 'Неверное тело запроса' },
				{ status: 400 }
			)
		}

		const result = await prisma.$transaction(async tx => {
			const existingProgress = await tx.moduleProgress.findFirst({
				where: {
					moduleId: data.moduleId,
					userId: data.userId,
				},
				include: {
					module: {
						include: {
							author: true,
							categories: true,
							cards: true,
						},
					},
				},
			})

			if (!existingProgress) {
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

				const moduleProgress = await tx.moduleProgress.findFirst({
					where: {
						moduleId: data.moduleId,
						userId: data.userId,
					},
					include: {
						module: {
							include: {
								author: true,
								categories: true,
								cards: true,
							},
						},
					},
				})

				return moduleProgress
			} else {
				return existingProgress
			}
		})

		return NextResponse.json(result)
	} catch (error) {
		if (error instanceof Error) {
			return NextResponse.json({ message: error.message }, { status: 400 })
		}
	}
}
