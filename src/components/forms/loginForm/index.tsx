import { signIn } from '@/features/auth/signIn'
import Link from 'next/link'
import styles from './styles.module.scss'

export default function LoginForm() {
	return (
		<form className={styles.login} action={signIn}>
			<input type='text' name='login' placeholder='Введите свой логин' />
			<input type='text' name='password' placeholder='Введите свой пароль' />
			<button type='submit'>Войти</button>
			<br />
			Нет аккаунта?<Link href='/auth/register'> Создать</Link>
		</form>
	)
}
