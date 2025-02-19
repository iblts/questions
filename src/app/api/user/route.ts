import prisma from '@/shared/lib/prisma'
import type { NextRequest } from 'next/server'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) {
	try {
		const users = await prisma.user.findMany()

		return Response.json(users)
	} catch (error) {
		throw error
	}
}
