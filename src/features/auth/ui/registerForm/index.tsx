'use client'

import { ROUTES } from '@/shared/constants'
import { Button, ControlledInput } from '@/shared/ui'
import Link from 'next/link'
import { useFormContext } from 'react-hook-form'
import { useRegister } from '../../model/hooks'
import styles from './styles.module.scss'

interface FormType {
	login: string
	password: string
	repeatPassword: string
}

export default function RegisterForm() {
	const { handleSubmit } = useFormContext<FormType>()
	const onSubmit = useRegister()

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
			<ControlledInput
				type='text'
				name='confirmPassword'
				placeholder='Повторите свой пароль'
			/>
			<Button type='submit'>Зарегистрироваться</Button>
			<br />
			Уже есть аккаунт?<Link href={ROUTES.LOGIN}> Войти</Link>
		</form>
	)
}
