import prisma from '@/shared/lib/prisma'
import type { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
	if (!request.body) {
		throw new Error('Не передано тело запроса')
	}

	const data = await request.json()

	if (data.length && data.length < 1) throw new Error('Неверное тело запроса')

	try {
		await prisma.cardProgress.createMany({
			data,
		})
	} catch (error) {
		throw error
	}
}
