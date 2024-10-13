import LoginForm from '@/components/forms/loginForm'
import { getAuth } from '@/features'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
	title: '',
	description: '',
}

export default async function Login() {
	const { user } = await getAuth()

	if (user) {
		redirect('/')
	}

	return (
		<main>
			<h1>Login</h1>
			<LoginForm />
		</main>
	)
}
