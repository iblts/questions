import RegisterForm from '@/components/forms/registerForm'
import { getAuth } from '@/features/auth/getAuth'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
	title: '',
	description: '',
}

export default async function Register() {
	const { user } = await getAuth()

	if (user) {
		redirect('/')
	}

	return (
		<main>
			<h1>Register</h1>
			<RegisterForm />
		</main>
	)
}
