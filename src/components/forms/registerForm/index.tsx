import { Button, Input } from '@/components'
import { signUp } from '@/features'
import Link from 'next/link'
import styles from './styles.module.scss'

export default function RegisterForm() {
	const action = async (formData: FormData) => {
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
			<Input type='text' name='login' placeholder='Введите свой логин' />
			<Input type='text' name='password' placeholder='Введите свой пароль' />
			<Input
				type='text'
				name='confirmPassword'
				placeholder='Повторите свой пароль'
			/>
			<Button type='submit'>Зарегистрироваться</Button>
			<br />
			Уже есть аккаунт?<Link href='/auth/login'> Войти</Link>
		</form>
	)
}
