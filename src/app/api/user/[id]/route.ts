import prisma from '@/shared/lib/prisma'
import { hashPassword } from '@/shared/utils/auth'
import type { NextRequest } from 'next/server'

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const { id } = await params

	try {
		const findedUser = await prisma.user.findFirst({
			where: { id },
			include: {
				modules: {
					include: {
						cards: true,
					},
				},
			},
		})

		if (!findedUser) throw new Error('Неверный id')

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { hashedPassword, ...responseData } = findedUser

		return Response.json(responseData)
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

	const { id } = await params
	let data = await request.json()

	if (!data) throw new Error('Неверное тело запроса')

	if (data.password) {
		const { password, ...userData } = data

		const hashedPassword = await hashPassword(password)

		data = {
			...userData,
			hashedPassword,
		}
	}

	try {
		const updatedUser = await prisma.user.update({
			where: { id },
			data,
		})

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { hashedPassword, ...responseData } = updatedUser

		return Response.json(responseData)
	} catch (error) {
		throw error
	}
}
