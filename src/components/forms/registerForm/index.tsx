import { signUp } from '@/features/auth/signUp'
import Link from 'next/link'
import styles from './styles.module.scss'

export default function RegisterForm() {
	const action = async (formData: FormData) => {
		'use server'

		try {
			await signUp(formData)
		} catch (error) {
			if (error instanceof Error) {
				console.log(error.message)
			}
		}
	}

	return (
		<form className={styles.login} action={action}>
			<input type='text' name='login' placeholder='Введите свой логин' />
			<input type='text' name='password' placeholder='Введите свой пароль' />
			<input
				type='text'
				name='confirmPassword'
				placeholder='Повторите свой пароль'
			/>
			<button type='submit'>Зарегистрироваться</button>
			<br />
			Уже есть аккаунт?<Link href='/auth/login'> Войти</Link>
		</form>
	)
}
