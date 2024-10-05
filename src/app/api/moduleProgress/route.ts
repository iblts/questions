import { getUserId } from '@/lib/getUserId'
import prisma from '@/lib/prisma'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
	const data = await request.json()

	const userId = getUserId(request)

	if (!userId) return Response.json({ status: 500, message: 'Не авторизован' })

	const moduleProgress = await prisma.moduleProgress.findFirst({
		where: {
			moduleId: data.moduleId,
			userId,
		},
	})

	if (moduleProgress)
		return Response.json({ message: 'Module progress already exist' })

	const createdModule = await prisma.moduleProgress.create({
		data,
	})

	return Response.json(createdModule)
}
