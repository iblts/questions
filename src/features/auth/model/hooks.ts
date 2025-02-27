'use client'

import { QUERY_KEYS, ROUTES } from '@/shared/constants'
import { queryClient } from '@/shared/providers'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { getAuth, signIn, signUp } from './authApi'
import { LoginFormType, RegisterFormType } from './shema'

export const useLoginForm = () => {
	const { handleSubmit, formState } = useFormContext<LoginFormType>()
	const login = useLogin()
	const router = useRouter()

	const onSubmit = (formData: LoginFormType) => {
		login.mutateAsync(formData).then(() => router.push(ROUTES.HOME))
	}

	const [displayError, setDisplayError] = useState<string | null>(null)

	useEffect(() => {
		if (formState.isSubmitting && !formState.isValid) {
			setDisplayError('Неверный логин или пароль')

			const timer = setTimeout(() => {
				setDisplayError(null)
			}, 2000)
			return () => clearTimeout(timer)
		}
	}, [formState.isSubmitting, formState.isValid])

	useEffect(() => {
		if (login.error) {
			setDisplayError(login.error.message || 'Произошла ошибка при входе')
			const timer = setTimeout(() => {
				setDisplayError(null)
			}, 2000)
			return () => clearTimeout(timer)
		}
	}, [login.error])

	return { submit: handleSubmit(onSubmit), state: login, error: displayError }
}

const useLogin = () => {
	return useMutation({
		mutationFn: (data: LoginFormType) => signIn(data.login, data.password),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER] }),
	})
}

const useRegister = () => {
	return useMutation({
		mutationFn: (data: RegisterFormType) => signUp(data.login, data.password),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER] }),
	})
}

export const useRegisterForm = () => {
	const { handleSubmit } = useFormContext<LoginFormType>()
	const register = useRegister()
	const router = useRouter()

	const onSubmit = async (formData: RegisterFormType) => {
		await register.mutateAsync(formData)
		router.push(ROUTES.HOME)
	}

	const [displayError, setDisplayError] = useState<string | null>(null)

	useEffect(() => {
		if (register.error) {
			setDisplayError(
				register.error.message || 'Произошла ошибка при регистрации'
			)
			const timer = setTimeout(() => {
				setDisplayError(null)
			}, 2000)
			return () => clearTimeout(timer)
		}
	}, [register.error])

	return {
		submit: handleSubmit(onSubmit),
		state: register,
		error: displayError,
	}
}

export const useAuth = () => {
	return useQuery({
		queryKey: [QUERY_KEYS.USER],
		queryFn: getAuth,
		staleTime: 5 * 60 * 1000,
		retry: false,
	})
}
