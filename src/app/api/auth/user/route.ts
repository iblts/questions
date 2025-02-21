import prisma from '@/shared/lib/prisma'
import jwt from 'jsonwebtoken'
import { NextResponse, type NextRequest } from 'next/server'

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret'

export async function GET(request: NextRequest) {
	const authHeader = request.headers.get('authorization')
	if (!authHeader) {
		return NextResponse.json(
			{ error: 'Нет токена авторизации' },
			{ status: 401 }
		)
	}

	const token = authHeader.split(' ')[1]
	if (token === 'undefined') {
		return NextResponse.json(
			{ error: 'Нет токена авторизации' },
			{ status: 401 }
		)
	}

	try {
		const decoded = jwt.verify(token, JWT_SECRET) as {
			id: string
			login: string
		}
		const user = await prisma.user.findUnique({ where: { id: decoded.id } })
		if (!user) {
			return NextResponse.json(
				{ error: 'Пользователь не найден' },
				{ status: 404 }
			)
		}

		return NextResponse.json({ id: user.id, login: user.login })
	} catch (error) {
		console.error(error)
		return NextResponse.json({ error: 'Неверный токен' }, { status: 401 })
	}
}
