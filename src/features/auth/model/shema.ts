import { z } from 'zod'

export const loginSchema = z.object({
	login: z.string().min(3, '').max(25, ''),
	password: z.string().min(8, '').max(50, ''),
})

export type LoginFormType = z.infer<typeof loginSchema>

export const registerSchema = z
	.object({
		login: z
			.string()
			.min(3, 'Логин не может быть короче 3 символов')
			.max(25, 'Логин не может быть длиннее 25 символов'),
		password: z
			.string()
			.min(8, 'Пароль не может быть короче 8 символов')
			.max(50, 'Пароль не может быть длиннее 50 символов'),
		confirmPassword: z.string(),
	})
	.refine(data => data.password === data.confirmPassword, {
		message: 'Пароли должны совпадать',
		path: ['confirmPassword'],
	})

export type RegisterFormType = z.infer<typeof loginSchema>
