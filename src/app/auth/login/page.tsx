import LoginForm from '@/components/forms/loginForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: '',
	description: '',
}

export default function Login() {
	return (
		<main>
			<h1>Login</h1>
			<LoginForm />
		</main>
	)
}
