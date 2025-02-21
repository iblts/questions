'use client'

import { HookFormProvider } from '@/shared/providers'
import { zodResolver } from '@hookform/resolvers/zod'
import type { ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { loginSchema } from '../model/shema'

export default function LoginHookFormProvider({
	children,
}: {
	children: ReactNode
}) {
	const methods = useForm({
		resolver: zodResolver(loginSchema),
		mode: 'onChange',
	})

	return <HookFormProvider methods={methods}>{children}</HookFormProvider>
}
