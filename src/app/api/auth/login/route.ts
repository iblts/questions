import bcrypt from 'bcrypt'
import { sign } from 'jsonwebtoken'
import type { NextRequest } from 'next/server'
import prisma from '../../../../../lib/prisma'

export async function POST(req: NextRequest) {
	const { name, password } = await req.json()

	try {
		const user = await prisma.user.findFirst({
			where: {
				name,
			},
		})

		if (!user)
			return Response.json({
				status: 500,
				message: 'Пользователь не существует',
			})

		const isValidPassword = await bcrypt.compare(password, user.password)

		if (!isValidPassword)
			return Response.json({
				status: 500,
				message: 'Неверный логин или пароль',
			})

		const token = sign(
			{
				id: user.id,
			},
			`${process.env.SECRET_KEY}`,
			{
				expiresIn: '30d',
			}
		)

		return Response.json({
			status: 200,
			message: 'Успешно',
			data: { ...user, token },
		})
	} catch (error) {
		console.log(error)
	}
}
