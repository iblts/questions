import { lucia } from '@/lib/lucia'
import prisma from '@/lib/prisma'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Argon2id } from 'oslo/password'

export async function signIn(formData: FormData) {
	'use server'

	const formDataRaw = {
		login: formData.get('login') as string,
		password: formData.get('password') as string,
	}

	try {
		const user = await prisma.user.findUnique({
			where: { login: formDataRaw.login },
		})

		if (!user) {
			throw new Error('Incorrect email or password')
		}

		const validPassword = await new Argon2id().verify(
			user.hashedPassword,
			formDataRaw.password
		)

		if (!validPassword) {
			throw new Error('Incorrect email or password')
		}

		const session = await lucia.createSession(user.id, {})
		const sessionCookie = lucia.createSessionCookie(session.id)

		cookies().set(
			sessionCookie.name,
			sessionCookie.value,
			sessionCookie.attributes
		)
	} catch (error) {
		return error
	}

	redirect('/')
}
