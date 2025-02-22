'use client'

import {
	Controller,
	type FieldValues,
	type RegisterOptions,
	useFormContext,
} from 'react-hook-form'
import Checkbox, { type CheckboxProps } from '../checkbox'

interface Props extends Omit<CheckboxProps, 'defaultValue'> {
	name: string
	rules?: Omit<
		RegisterOptions<FieldValues, string>,
		'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
	>
	defaultValue?: boolean
}

export default function ControlledCheckbox({
	name,
	rules,
	defaultValue,
	...props
}: Props) {
	const { control } = useFormContext()

	return (
		<Controller
			control={control}
			name={name}
			rules={rules}
			render={({ field: { value, onChange } }) => (
				<Checkbox isActive={value} setActive={onChange} {...props} />
			)}
			defaultValue={defaultValue}
		/>
	)
}
