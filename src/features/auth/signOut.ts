'use server'

import { lucia } from '@/shared/lib/lucia'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getAuth } from './getAuth'

export async function signOut() {
	const { session } = await getAuth()

	if (!session) {
		redirect('/atuh/login')
	}

	await lucia.invalidateSession(session.id)

	const sessionCookie = lucia.createBlankSessionCookie()

	cookies().set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes
	)

	redirect('/auth/login')
}
