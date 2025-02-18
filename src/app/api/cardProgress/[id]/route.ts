import { lucia } from '@/shared/lib/lucia'
import prisma from '@/shared/lib/prisma'
import type { NextRequest } from 'next/server'

export async function GET(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	const { id } = params

	const sessionId = request.cookies.get(lucia.sessionCookieName)?.value ?? null
	if (!sessionId) {
		return {
			user: null,
			session: null,
		}
	}

	const result = await lucia.validateSession(sessionId)

	if (!result.session?.fresh) {
		throw new Error('Unauthorized')
	}

	try {
		const findedCard = await prisma.cardProgress.findFirst({
			where: { cardId: id, userId: result.user?.id },
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
	{ params }: { params: { cardId: string } }
) {
	if (!request.body) {
		throw new Error('Не передано тело запроса')
	}

	const sessionId = request.cookies.get(lucia.sessionCookieName)?.value ?? null
	if (!sessionId) {
		return {
			user: null,
			session: null,
		}
	}

	const result = await lucia.validateSession(sessionId)

	if (!result.session?.fresh) {
		throw new Error('Unauthorized')
	}

	const { cardId } = params
	const data = await request.json()

	if (!data) throw new Error('Неверное тело запроса')

	try {
		const updatedCard = await prisma.cardProgress.update({
			where: { userId_cardId: { userId: result.user.id, cardId } },
			data,
		})

		return Response.json(updatedCard)
	} catch (error) {
		throw error
	}
}
