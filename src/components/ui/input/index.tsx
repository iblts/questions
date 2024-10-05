import classNames from 'classnames'
import { type ChangeEventHandler } from 'react'
import styles from './styles.module.scss'

export default function Input({
	value,
	onChange,
	className,
	placeholder,
	type,
}: {
	value?: string
	onChange?: ChangeEventHandler<HTMLInputElement>
	className?: string
	placeholder?: string
	type?: 'text' | 'email' | 'password' | 'number'
}) {
	return (
		<input
			className={classNames(styles.input, className)}
			type='text'
			placeholder={placeholder}
			value={value}
			onChange={onChange}
		/>
	)
}
