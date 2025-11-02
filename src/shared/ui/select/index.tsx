'use client'

import classNames from 'classnames'
import { type LabelHTMLAttributes, useState } from 'react'
import { IconArrowDown } from '../icons'
import styles from './styles.module.scss'

interface Option {
	label: string
	value: string
}

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
	options: Option[]
	initialValue?: Option
	label?: string
	onSelectOption?: (value: Option) => void
}

export const Select = ({
	options,
	initialValue,
	label,
	className,
	onSelectOption,
	...props
}: Props) => {
	const [value, setValue] = useState(initialValue || options[0])
	const [isOpen, setOpen] = useState(false)

	const handleSelectOption = (option: Option) => {
		setOpen(false)
		setValue(option)
		onSelectOption?.(option)
	}

	return (
		<label className={classNames(styles.selectBody, className)} {...props}>
			{label && <p>{label}</p>}
			<button onClick={() => setOpen(prev => !prev)}>
				{value.label}
				<IconArrowDown
					className={classNames(styles.icon, { [styles.open]: isOpen })}
					fill='#fff'
				/>
			</button>
			<ul className={classNames(styles.list, { [styles.open]: isOpen })}>
				{options.map(option => (
					<li key={option.label}>
						<button onClick={() => handleSelectOption(option)}>
							{option.label}
						</button>
					</li>
				))}
			</ul>
		</label>
	)
}
