import { type NextRequest, NextResponse } from 'next/server'
import { API_ROUTES, ROUTES } from './shared/constants'

export async function middleware(req: NextRequest) {
	try {
		const authorizedPaths: string[] = [
			ROUTES.CREATE,
			ROUTES.MODULE,
			ROUTES.PROFILE,
		]
		if (!authorizedPaths.some(path => req.nextUrl.pathname.includes(path))) {
			return NextResponse.next()
		}

		const accessToken = req.cookies.get('access')?.value

		if (!accessToken) {
			return NextResponse.rewrite(new URL(ROUTES.LOGIN, req.url))
		}

		const response = await fetch(API_ROUTES.AUTH_ME, {
			method: 'GET',
			headers: { Authorization: `Bearer ${accessToken}` },
		})

		if (!response.ok) {
			return NextResponse.rewrite(new URL(ROUTES.LOGIN, req.url))
		}

		const user = await response.json()

		if (!user.id) {
			return NextResponse.rewrite(new URL(ROUTES.LOGIN, req.url))
		}

		return NextResponse.next()
	} catch (error) {
		console.error('Ошибка в middleware:', error)
		return NextResponse.rewrite(new URL(ROUTES.LOGIN, req.url))
	}
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
