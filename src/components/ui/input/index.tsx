import classNames from 'classnames'
import type { InputHTMLAttributes } from 'react'
import styles from './styles.module.scss'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	variant?: 'primary' | 'secondary'
}

export default function Input({
	className,
	variant = 'primary',
	...props
}: Props) {
	return (
		<input
			className={classNames(styles.input, styles[variant], className)}
			{...props}
		/>
	)
}
