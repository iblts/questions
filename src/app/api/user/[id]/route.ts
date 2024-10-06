import prisma from '@/lib/prisma'
import type { NextRequest } from 'next/server'
import { Argon2id } from 'oslo/password'

export async function GET(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	const { id } = params

	try {
		const findedUser = await prisma.user.findFirst({
			where: { id },
		})

		if (!findedUser) throw new Error('Неверный id')

		const { hashedPassword, ...responseData } = findedUser

		return Response.json(responseData)
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
	let data = await request.json()

	if (!data) throw new Error('Неверное тело запроса')

	if (data.password) {
		const { password, ...userData } = data

		const hashedPassword = await new Argon2id().hash(password)

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

		const { hashedPassword, ...responseData } = updatedUser

		console.log(hashedPassword)

		return Response.json(responseData)
	} catch (error) {
		throw error
	}
}
