'use client'

import type { ReactNode } from 'react'
import {
	type FieldValues,
	FormProvider,
	useForm,
	type UseFormReturn,
} from 'react-hook-form'

export default function HookFormProvider<TFieldValues extends FieldValues>({
	children,
	methods,
}: {
	children: ReactNode
	methods?: UseFormReturn<TFieldValues, undefined, undefined>
}) {
	const initialMethods = useForm<TFieldValues>({
		mode: 'onChange',
	})

	return methods ? (
		<FormProvider {...methods}>{children}</FormProvider>
	) : (
		<FormProvider {...initialMethods}>{children}</FormProvider>
	)
}
