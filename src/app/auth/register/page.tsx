import { RegisterForm } from '@/features/auth'
import { RegisterHookFormProvider } from '@/features/auth/'
import { Container } from '@/shared/ui'
import type { Metadata } from 'next'
import styles from '../page.module.scss'

export const metadata: Metadata = {
	title: 'Зарегистрироваться',
	description: '',
}

export default function Register() {
	return (
		<main className={styles.auth}>
			<Container width={500}>
				<h1>Зарегистрироваться</h1>
				<RegisterHookFormProvider>
					<RegisterForm />
				</RegisterHookFormProvider>
			</Container>
		</main>
	)
}
