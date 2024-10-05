import { prisma } from '@/lib/prisma'
import { NextRequest } from 'next/server'

export async function GET(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	const userId = params.id

	const userModules = await prisma.module.findMany({
		where: {
			authorId: userId,
		},
		include: {
			cards: true,
		},
	})

	return Response.json(userModules)
}
