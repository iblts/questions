import { RegisterForm } from '@/features/auth'
import HookFormProvider from '@/shared/providers/HookFormProvider'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Register',
	description: '',
}

export default function Register() {
	return (
		<main>
			<h1>Register</h1>
			<HookFormProvider>
				<RegisterForm />
			</HookFormProvider>
		</main>
	)
}
