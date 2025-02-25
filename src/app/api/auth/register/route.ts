import prisma from '@/shared/lib/prisma'
import {
	generateAccessToken,
	generateRefreshToken,
	hashPassword,
} from '@/shared/utils/auth'
import { NextResponse, type NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
	try {
		const { login, password } = (await request.json()) as {
			login?: string
			password?: string
		}
		if (!login || !password) {
			return NextResponse.json(
				{ error: 'Укажите логин и пароль' },
				{ status: 400 }
			)
		}

		const existingUser = await prisma.user.findUnique({
			where: { login: login.toLocaleLowerCase() },
		})
		if (existingUser) {
			return NextResponse.json(
				{ error: 'Пользователь с таким логином уже существует' },
				{ status: 400 }
			)
		}

		const hashedPassword = await hashPassword(password)
		const user = await prisma.user.create({
			data: { login: login.toLocaleLowerCase(), hashedPassword },
		})

		const accessToken = generateAccessToken(user)
		const refreshToken = generateRefreshToken(user)

		const response = NextResponse.json({ accessToken, refreshToken })
		response.cookies.set('refreshToken', refreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			path: '/',
			maxAge: 7 * 24 * 60 * 60,
		})
		return response
	} catch (error) {
		console.error(error)
		return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 })
	}
}
