import { verify } from 'jsonwebtoken'
import { type NextRequest } from 'next/server'

export function getUserId(request: NextRequest) {
	const token = request.cookies.get('token')?.value
	if (!token) return null

	const verified = verify(token, process.env.SECRET_KEY!) as { id: string }
	return verified.id
}
