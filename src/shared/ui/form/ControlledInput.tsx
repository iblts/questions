'use client'

import type { InputProps } from '@/shared/types'
import type { ReactNode } from 'react'
import {
	Controller,
	type FieldValues,
	type Path,
	type RegisterOptions,
	useFormContext,
} from 'react-hook-form'
import { Input } from '../input'

interface Props<T extends FieldValues = FieldValues> extends InputProps {
	name: Path<T>
	formatOnChange?: (str: string) => string
	formatValue?: (str: string) => string
	render?: (props: InputProps) => ReactNode
	rules?:
		| Omit<
				RegisterOptions<T, Path<T>>,
				'setValueAs' | 'disabled' | 'valueAsNumber' | 'valueAsDate'
		  >
		| undefined
}

export default function ControlledInput<FormType extends FieldValues>({
	name,
	formatOnChange,
	formatValue,
	rules,
	render,
	...props
}: Props<FormType>) {
	const { control } = useFormContext<FormType>()

	return (
		<Controller
			rules={rules}
			render={({
				field: { value, onChange, ...fields },
				fieldState: { error },
			}) => {
				return (
					<>
						{render ? (
							render({
								...props,
								...fields,
								onChange: e => {
									onChange(formatOnChange?.(e.target.value) || e.target.value)
								},
								value: formatValue?.(value) || value || '',
								error: props.error || error?.message,
							})
						) : (
							<Input
								{...props}
								{...fields}
								onChange={e => {
									onChange(formatOnChange?.(e.target.value) || e.target.value)
								}}
								value={formatValue?.(value) || value || ''}
								error={props.error || error?.message}
							/>
						)}
					</>
				)
			}}
			name={name}
			control={control}
		/>
	)
}
