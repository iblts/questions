'use client'

import { ROUTES } from '@/shared/constants'
import { Button, ControlledInput } from '@/shared/ui'
import Link from 'next/link'
import { useRegisterForm } from '../../model/hooks'
import PasswordInput from '../passwordInput'
import styles from '../styles.module.scss'

export default function RegisterForm() {
	const { state, submit, error } = useRegisterForm()

	return (
		<form className={styles.form} onSubmit={submit}>
			{error && <p className={styles.error}>{error}</p>}
			<ControlledInput
				type='text'
				name='login'
				placeholder='Введите свой логин'
			/>
			<ControlledInput
				name='password'
				placeholder='Введите свой пароль'
				render={props => <PasswordInput {...props} />}
			/>
			<ControlledInput
				name='confirmPassword'
				placeholder='Повторите свой пароль'
				render={props => <PasswordInput {...props} />}
			/>
			<Button type='submit' disabled={state.isPending}>
				Зарегистрироваться
			</Button>
			<p>
				Уже есть аккаунт?<Link href={ROUTES.LOGIN}> Войти</Link>
			</p>
		</form>
	)
}
