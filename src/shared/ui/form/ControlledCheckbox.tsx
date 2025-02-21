'use client'

import {
	Controller,
	type FieldValues,
	type RegisterOptions,
	useFormContext,
} from 'react-hook-form'
import Checkbox from '../checkbox'

interface Props {
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
}: Props) {
	const { control } = useFormContext()

	return (
		<Controller
			control={control}
			name={name}
			rules={rules}
			render={({ field: { value, onChange } }) => (
				<Checkbox isActive={value} setActive={onChange} />
			)}
			defaultValue={defaultValue}
		/>
	)
}
