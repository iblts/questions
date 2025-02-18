'use client'

import type { InputProps } from '@/shared/types'
import {
	Controller,
	type FieldValues,
	type Path,
	type RegisterOptions,
	useFormContext,
} from 'react-hook-form'
import Input from '../input'

interface Props<T extends FieldValues = FieldValues> extends InputProps {
	name: Path<T>
	formatOnChange?: (str: string) => string
	formatValue?: (str: string) => string
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
	...props
}: Props<FormType>) {
	const { control } = useFormContext<FormType>()

	return (
		<Controller
			rules={rules}
			render={({
				field: { value, onChange, ...fields },
				fieldState: { error },
			}) => (
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
			name={name}
			control={control}
		/>
	)
}
