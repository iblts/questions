import prisma from '@/shared/lib/prisma'
import {
	comparePassword,
	generateAccessToken,
	generateRefreshToken,
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

		const user = await prisma.user.findUnique({
			where: { login: login.toLocaleLowerCase() },
		})
		if (!user) {
			return NextResponse.json(
				{ error: 'Неверные креденшелы' },
				{ status: 401 }
			)
		}

		const isValid = await comparePassword(password, user.hashedPassword)
		if (!isValid) {
			return NextResponse.json(
				{ error: 'Неверные креденшелы' },
				{ status: 401 }
			)
		}

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
