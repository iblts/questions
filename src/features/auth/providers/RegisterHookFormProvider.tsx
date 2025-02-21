'use client'

import { HookFormProvider } from '@/shared/providers'
import { zodResolver } from '@hookform/resolvers/zod'
import type { ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { registerSchema } from '../model/shema'

export default function RegisterHookFormProvider({
	children,
}: {
	children: ReactNode
}) {
	const methods = useForm({
		resolver: zodResolver(registerSchema),
		mode: 'onChange',
	})

	return <HookFormProvider methods={methods}>{children}</HookFormProvider>
}
