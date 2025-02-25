'use server'

import { cookies } from 'next/headers'

export const getHeaders = async () => {
	const cookieStore = await cookies()

	const headers: HeadersInit = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${cookieStore.get('access')?.value}`,
	}

	return headers
}
