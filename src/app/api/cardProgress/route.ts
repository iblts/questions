import { getUserId } from '@/lib/getUserId'
import { prisma } from '@/lib/prisma'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
	const data = await request.json()

	const userId = getUserId(request)

	if (!userId) return Response.json({ status: 500, message: 'Не авторизован' })

	const moduleProgress = await prisma.moduleProgress.findFirst({
		where: {
			id: data.moduleId,
			userId,
		},
		include: {
			cardProgress: true,
		},
	})

	if (moduleProgress && moduleProgress.cardProgress.length > 0)
		return Response.json({ message: 'Module progress already exist' })

	const cards = await prisma.cardProgress.createMany({
		data: {
			...data,
			moduleId: moduleProgress?.id,
		},
	})

	return Response.json(cards)
}

export async function PUT(request: NextRequest) {
	const data = await request.json()

	const cards = await prisma.cardProgress.updateMany({
		data,
	})

	return Response.json(cards)
}
