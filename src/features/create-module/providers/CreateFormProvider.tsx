'use client'

import { HookFormProvider } from '@/shared/providers'
import { zodResolver } from '@hookform/resolvers/zod'
import type { ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { moduleSchema } from '../model/shema'

export default function CreateFormProvider({
	children,
}: {
	children: ReactNode
}) {
	const methods = useForm({
		resolver: zodResolver(moduleSchema),
		mode: 'onChange',
		defaultValues: {
			title: '',
			description: '',
			cards: [
				{
					id: 0,
					termin: '',
					definition: '',
				},
				{
					id: 1,
					termin: '',
					definition: '',
				},
			],
		},
	})

	return <HookFormProvider methods={methods}>{children}</HookFormProvider>
}
