import RegisterForm from '@/components/forms/registerForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: '',
	description: '',
}

export default function Register() {
	return (
		<main>
			<h1>Register</h1>
			<RegisterForm />
		</main>
	)
}
