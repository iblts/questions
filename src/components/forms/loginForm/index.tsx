import { Button, Input } from '@/components'
import { signIn } from '@/features'
import Link from 'next/link'
import styles from './styles.module.scss'

export default function LoginForm() {
	return (
		<form className={styles.login} action={signIn}>
			<Input type='text' name='login' placeholder='Введите свой логин' />
			<Input type='text' name='password' placeholder='Введите свой пароль' />
			<Button type='submit'>Войти</Button>
			<br />
			Нет аккаунта?<Link href='/auth/register'> Создать</Link>
		</form>
	)
}
