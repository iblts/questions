'use client'

import { HookFormProvider } from '@/shared/providers'
import { zodResolver } from '@hookform/resolvers/zod'
import type { ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { type CardFormType, cardSchema } from '../model/shema'

export default function CardFormProvider({
	children,
	defaultValues = {
		id: '',
		termin: '',
		definition: '',
	},
}: {
	children: ReactNode
	defaultValues?: CardFormType
}) {
	const methods = useForm({
		resolver: zodResolver(cardSchema),
		mode: 'onChange',
		defaultValues,
	})

	return <HookFormProvider methods={methods}>{children}</HookFormProvider>
}
