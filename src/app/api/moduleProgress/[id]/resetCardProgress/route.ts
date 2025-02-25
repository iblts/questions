import prisma from '@/shared/lib/prisma'
import { CardProgressWithRelations } from '@/shared/types'
import { verifyToken } from '@/shared/utils'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	if (!request.body) {
		throw new Error('Не передано тело запроса')
	}

	const token = request.headers.get('Authorization')?.split(' ')[1]

	if (!token) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	}

	const user = verifyToken(token)

	const { id } = await params
	const data = (await request.json()) as CardProgressWithRelations[]

	if (!data) throw new Error('Неверное тело запроса')

	try {
		const updatedCard = await prisma.cardProgress.updateMany({
			where: { card: { moduleId: id }, userId: user.id },
			data: { stage: 1 },
		})

		return Response.json(updatedCard)
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.stack)
		}
		throw error
	}
}
