'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import { redirect } from 'next/navigation'
import { getAuth, signIn, signUp } from './authApi'

interface FormType {
	login: string
	password: string
}

export const useLogin = () => {
	const login = useMutation({
		mutationFn: (data: { login: string; password: string }) =>
			signIn(data.login, data.password),
	})

	const onSubmit = async (formData: FormType) => {
		login.mutate(formData)
		redirect('/')
	}

	return onSubmit
}

export const useRegister = () => {
	const login = useMutation({
		mutationFn: (data: { login: string; password: string }) =>
			signUp(data.login, data.password),
	})

	const onSubmit = async (formData: FormType) => {
		login.mutate(formData)
		redirect('/')
	}

	return onSubmit
}

export const useAuth = () => {
	return useQuery({
		queryKey: ['user'],
		queryFn: getAuth,
	})
}
