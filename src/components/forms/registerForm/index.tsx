import { signUp } from '@/features/auth/signUp'
import Link from 'next/link'
import styles from './styles.module.scss'

export default function RegisterForm() {
	return (
		<form className={styles.login} action={signUp}>
			<input type='text' name='login' placeholder='Введите свой логин' />
			<input type='text' name='password' placeholder='Введите свой пароль' />
			<input type='text' name='password' placeholder='Повторите свой пароль' />
			<button type='submit'>Зарегистрироваться</button>
			<br />
			Уже есть аккаунт?<Link href='/auth/login'> Войти</Link>
		</form>
	)
}
