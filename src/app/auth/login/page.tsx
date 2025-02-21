import { LoginForm, LoginHookFormProvider } from '@/features/auth'
import { Container } from '@/shared/ui'
import type { Metadata } from 'next'
import styles from '../page.module.scss'

export const metadata: Metadata = {
	title: 'Войти',
	description: '',
}

export default async function Login() {
	return (
		<main className={styles.auth}>
			<Container width={500}>
				<h1>Войти в аккаунт</h1>
				<LoginHookFormProvider>
					<LoginForm />
				</LoginHookFormProvider>
			</Container>
		</main>
	)
}
