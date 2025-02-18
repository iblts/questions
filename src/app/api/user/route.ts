import prisma from '@/shared/lib/prisma'
import type { NextRequest } from 'next/server'

export async function GET(_: NextRequest) {
	try {
		const users = await prisma.user.findMany()

		return Response.json(users)
	} catch (error) {
		throw error
	}
}
