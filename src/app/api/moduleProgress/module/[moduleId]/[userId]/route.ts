import prisma from '@/shared/lib/prisma'
import type { NextRequest } from 'next/server'

interface Props {
	params: { moduleId: string; userId: string }
}

export async function GET(request: NextRequest, { params }: Props) {
	const { userId, moduleId } = params

	const modules = await prisma.moduleProgress.findFirst({
		where: {
			userId,
			moduleId,
		},
		include: {
			module: true,
			cardProgress: {
				include: {
					card: true,
				},
			},
			user: true,
		},
	})

	return Response.json(modules)
}
