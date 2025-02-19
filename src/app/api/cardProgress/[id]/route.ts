import prisma from '@/shared/lib/prisma'
import { verifyToken } from '@/shared/utils'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const { id } = await params

	const token = request.headers.get('Authorization')?.split(' ')[1]

	if (!token) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	}

	const user = verifyToken(token)

	try {
		const findedCard = await prisma.cardProgress.findFirst({
			where: { cardId: id, userId: user?.id },
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
	{ params }: { params: Promise<{ cardId: string }> }
) {
	if (!request.body) {
		throw new Error('Не передано тело запроса')
	}

	const token = request.headers.get('Authorization')?.split(' ')[1]

	if (!token) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	}

	const user = verifyToken(token)

	const { cardId } = await params
	const data = await request.json()

	if (!data) throw new Error('Неверное тело запроса')

	try {
		const updatedCard = await prisma.cardProgress.update({
			where: { userId_cardId: { userId: user.id, cardId } },
			data,
		})

		return Response.json(updatedCard)
	} catch (error) {
		throw error
	}
}
