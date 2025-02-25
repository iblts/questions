import prisma from '@/shared/lib/prisma'
import { generateAccessToken, generateRefreshToken } from '@/shared/utils/auth'
import jwt from 'jsonwebtoken'
import { NextResponse, type NextRequest } from 'next/server'

const JWT_SECRET = process.env.SECRET_KEY || 'supersecret'

export async function POST(request: NextRequest) {
	try {
		const { refreshToken } = await request.json()
		if (!refreshToken) {
			console.log('TOKEN', refreshToken)
			return NextResponse.json({ error: 'Нет refresh токена' }, { status: 401 })
		}

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

		return NextResponse.json({
			accessToken: newAccessToken,
			refreshToken: newRefreshToken,
		})
	} catch (error) {
		console.error(error)
		return NextResponse.json(
			{ error: 'Неверный или просроченный refresh токен' },
			{ status: 401 }
		)
	}
}
