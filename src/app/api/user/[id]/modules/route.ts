import { NextRequest } from 'next/server'
import prisma from '../../../../../../lib/prisma'

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
