'use client'

import { ROUTES } from '@/shared/constants'
import { Button, ControlledInput } from '@/shared/ui'
import Link from 'next/link'
import { useFormContext } from 'react-hook-form'
import { useLogin } from '../../model/hooks'
import styles from './styles.module.scss'

interface FormType {
	login: string
	password: string
}

export default function LoginForm() {
	const { handleSubmit } = useFormContext<FormType>()
	const onSubmit = useLogin()

	return (
		<form className={styles.login} onSubmit={handleSubmit(onSubmit)}>
			<ControlledInput
				type='text'
				name='login'
				placeholder='Введите свой логин'
			/>
			<ControlledInput
				type='text'
				name='password'
				placeholder='Введите свой пароль'
			/>
			<Button type='submit'>Войти</Button>
			<br />
			Нет аккаунта?<Link href={ROUTES.REGISTER}> Создать</Link>
		</form>
	)
}
