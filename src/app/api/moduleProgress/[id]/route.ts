import { getUserId } from '@/lib/getUserId'
import prisma from '@/lib/prisma'
import { NextRequest } from 'next/server'

export async function GET(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	const { id } = params

	const userId = getUserId(request) as string

	const modules = await prisma.moduleProgress.findFirst({
		where: {
			moduleId: id,
			userId,
		},
		include: {
			module: {
				include: {
					cards: true,
				},
			},
			cardProgress: {
				include: {
					card: true,
				},
			},
		},
	})

	return Response.json(modules)
}
