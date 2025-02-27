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

		let accessToken = req.cookies.get('access')?.value

		if (!accessToken) {
			return NextResponse.rewrite(new URL(ROUTES.LOGIN, req.url))
		}

		const authResponse = await fetch(API_ROUTES.AUTH_ME, {
			method: 'GET',
			headers: { Authorization: `Bearer ${accessToken}` },
		})

		if (!authResponse.ok) {
			const refreshToken = req.cookies.get('refreshToken')?.value
			if (!refreshToken) {
				return NextResponse.rewrite(new URL(ROUTES.LOGIN, req.url))
			}

			const refreshResponse = await fetch(API_ROUTES.REFRESH, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ refreshToken }),
			})

			if (refreshResponse.ok) {
				const data = await refreshResponse.json()
				accessToken = data.accessToken
				const newRefreshToken = data.refreshToken

				if (accessToken && newRefreshToken) {
					const response = NextResponse.next()
					response.cookies.set('access', accessToken, {
						httpOnly: true,
						secure: process.env.NODE_ENV === 'production',
						path: '/',
						maxAge: 60 * 60,
					})
					response.cookies.set('refreshToken', newRefreshToken, {
						httpOnly: true,
						secure: process.env.NODE_ENV === 'production',
						path: '/',
						maxAge: 7 * 24 * 60 * 60,
					})

					const newAuthResponse = await fetch(API_ROUTES.AUTH_ME, {
						method: 'GET',
						headers: { Authorization: `Bearer ${accessToken}` },
					})

					if (!newAuthResponse.ok) {
						return NextResponse.rewrite(new URL(ROUTES.LOGIN, req.url))
					}

					return response
				} else {
					return NextResponse.rewrite(new URL(ROUTES.LOGIN, req.url))
				}
			} else {
				return NextResponse.rewrite(new URL(ROUTES.LOGIN, req.url))
			}
		}

		const user = await authResponse.json()

		if (!user.id) {
			return NextResponse.rewrite(new URL(ROUTES.LOGIN, req.url))
		}

		return NextResponse.next()
	} catch (error) {
		console.error(error)
		return NextResponse.rewrite(new URL(ROUTES.LOGIN, req.url))
	}
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
