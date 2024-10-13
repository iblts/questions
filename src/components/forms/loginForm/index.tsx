import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import { signIn } from '@/features/auth/signIn'
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
