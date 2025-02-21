'use client'

import { ROUTES } from '@/shared/constants'
import { Button, ControlledInput } from '@/shared/ui'
import Link from 'next/link'
import { useLoginForm } from '../../model/hooks'
import PasswordInput from '../passwordInput'
import styles from '../styles.module.scss'

export default function LoginForm() {
	const { state, submit, error } = useLoginForm()

	return (
		<form className={styles.form} onSubmit={submit}>
			{error && <p className={styles.error}>{error}</p>}
			<ControlledInput
				type='text'
				name='login'
				placeholder='Введите свой логин'
				autoComplete='off'
				autoCorrect='off'
				spellCheck='false'
			/>
			<ControlledInput
				name='password'
				placeholder='Введите свой пароль'
				autoComplete='new-password'
				autoCorrect='off'
				spellCheck='false'
				render={props => <PasswordInput {...props} />}
			/>
			<Button type='submit' disabled={state.isPending}>
				Войти
			</Button>
			<p>
				Нет аккаунта?<Link href={ROUTES.REGISTER}> Создать</Link>
			</p>
		</form>
	)
}
