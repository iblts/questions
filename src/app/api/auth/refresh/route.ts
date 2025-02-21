import prisma from '@/shared/lib/prisma'
import { generateAccessToken, generateRefreshToken } from '@/shared/utils/auth'
import jwt from 'jsonwebtoken'
import { NextResponse, type NextRequest } from 'next/server'

const JWT_SECRET = process.env.SECRET_KEY || 'supersecret'

export async function POST(request: NextRequest) {
	const refreshTokenCookie = request.cookies.get('refreshToken')
	const refreshToken = refreshTokenCookie?.value
	if (!refreshToken) {
		return NextResponse.json({ error: 'Нет refresh токена' }, { status: 401 })
	}

	try {
		const decoded = jwt.verify(refreshToken, JWT_SECRET) as { id: string }

		const user = await prisma.user.findUnique({ where: { id: decoded.id } })
		if (!user) {
			return NextResponse.json(
				{ error: 'Пользователь не найден' },
				{ status: 404 }
			)
		}

		const newAccessToken = generateAccessToken(user)
		const newRefreshToken = generateRefreshToken(user)

		const response = NextResponse.json({ accessToken: newAccessToken })
		response.cookies.set('refreshToken', newRefreshToken, {
			httpOnly: true,
			secure: true,
			path: '/',
			maxAge: 7 * 24 * 60 * 60,
		})
		return response
	} catch (error) {
		console.error(error)
		return NextResponse.json(
			{ error: 'Неверный или просроченный refresh токен' },
			{ status: 401 }
		)
	}
}
