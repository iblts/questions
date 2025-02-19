'use client'

import type { ReactNode } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

export default function HookFormProvider({
	children,
}: {
	children: ReactNode
}) {
	const methods = useForm({
		mode: 'onChange',
	})

	return <FormProvider {...methods}>{children}</FormProvider>
}
