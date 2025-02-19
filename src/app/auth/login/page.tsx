import { LoginForm } from '@/features/auth'
import HookFormProvider from '@/shared/providers/HookFormProvider'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: '',
	description: '',
}

export default async function Login() {
	return (
		<main>
			<h1>Login</h1>
			<HookFormProvider>
				<LoginForm />
			</HookFormProvider>
		</main>
	)
}
