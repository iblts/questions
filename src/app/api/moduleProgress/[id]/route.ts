import prisma from '@/shared/lib/prisma'
import { verifyToken } from '@/shared/utils/auth'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const moduleId = (await params).id
	const token = request.headers.get('Authorization')?.split(' ')[1]

	if (!token) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	}

	const user = verifyToken(token)

	try {
		const findedModule = await prisma.moduleProgress.findFirst({
			where: { moduleId, userId: user.id },
			include: {
				module: {
					include: {
						author: true,
						cards: {
							include: {
								cardProgress: {
									where: {
										card: {
											moduleId: moduleId,
										},
										userId: user.id,
									},
								},
							},
						},
					},
				},
			},
		})

		return Response.json(findedModule)
	} catch (error) {
		throw error
	}
}

export async function PUT(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	if (!request.body) {
		throw new Error('Не передано тело запроса')
	}

	const token = request.headers.get('Authorization')?.split(' ')[1]

	if (!token) {
		throw new Error('Unauthorized')
	}

	const user = verifyToken(token)

	const moduleId = (await params).id
	const data = await request.json()

	if (!data) throw new Error('Неверное тело запроса')

	try {
		const updatedModule = await prisma.moduleProgress.update({
			where: { userId_moduleId: { userId: user.id, moduleId } },
			data,
		})

		return Response.json(updatedModule)
	} catch (error) {
		throw error
	}
}
