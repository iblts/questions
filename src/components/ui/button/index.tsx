import classNames from 'classnames'
import type { ButtonHTMLAttributes } from 'react'
import styles from './styles.module.scss'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'primary' | 'secondary'
}

export default function Button({
	children,
	className,
	variant = 'primary',
	...props
}: Props) {
	return (
		<button
			className={classNames(styles.button, styles[variant], className)}
			{...props}
		>
			{children}
		</button>
	)
}
