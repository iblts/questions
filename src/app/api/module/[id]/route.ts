import prisma from '@/shared/lib/prisma'
import type { NextRequest } from 'next/server'

export async function GET(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	const { id } = params

	try {
		const findedModule = await prisma.module.findFirst({
			where: { id },
			include: {
				cards: true,
				author: {
					select: {
						login: true,
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
	{ params }: { params: { id: string } }
) {
	if (!request.body) {
		throw new Error('Не передано тело запроса')
	}

	const { id } = params
	const data = await request.json()

	if (!data) throw new Error('Неверное тело запроса')

	try {
		const updatedModule = await prisma.module.update({
			where: { id },
			data,
		})

		return Response.json(updatedModule)
	} catch (error) {
		throw error
	}
}
