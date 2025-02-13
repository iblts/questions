'use server'

import { lucia } from '@/shared/lib/lucia'
import prisma from '@/shared/lib/prisma'
import { generateId } from 'lucia'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Argon2id } from 'oslo/password'

export async function signUp(formData: FormData) {
	const formDataRaw = {
		login: formData.get('login') as string,
		password: formData.get('password') as string,
		confirmPassword: formData.get('confirmPassword') as string,
	}

	if (formDataRaw.password.trim() !== formDataRaw.confirmPassword.trim()) {
		throw new Error('Passwords do not match')
	}

	try {
		const hashedPassword = await new Argon2id().hash(formDataRaw.password)
		const userId = generateId(15)

		await prisma.user.create({
			data: {
				id: userId,
				login: formDataRaw.login,
				hashedPassword,
			},
		})

		const session = await lucia.createSession(userId, {})
		const sessionCookie = lucia.createSessionCookie(session.id)

		cookies().set(
			sessionCookie.name,
			sessionCookie.value,
			sessionCookie.attributes
		)
	} catch (error) {
		console.log(error)
	}

	redirect('/')
}
