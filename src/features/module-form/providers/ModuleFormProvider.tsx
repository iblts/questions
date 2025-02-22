'use client'

import { HookFormProvider } from '@/shared/providers'
import { zodResolver } from '@hookform/resolvers/zod'
import type { ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { ModuleFormType, moduleSchema } from '../model/shema'

export default function ModuleFormProvider({
	children,
	defaultValues = {
		title: '',
		description: '',
		cards: [
			{
				id: '0',
				termin: '',
				definition: '',
			},
			{
				id: '1',
				termin: '',
				definition: '',
			},
		],
	},
}: {
	children: ReactNode
	defaultValues?: ModuleFormType
}) {
	const methods = useForm({
		resolver: zodResolver(moduleSchema),
		mode: 'onChange',
		defaultValues,
	})

	return <HookFormProvider methods={methods}>{children}</HookFormProvider>
}
