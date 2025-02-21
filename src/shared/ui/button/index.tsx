'use client'

import classNames from 'classnames'
import Link from 'next/link'
import type { ButtonHTMLAttributes } from 'react'
import styles from './styles.module.scss'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'primary' | 'secondary'
	link?: string
}

export default function Button({
	children,
	className,
	variant = 'primary',
	link,
	...props
}: Props) {
	return (
		<>
			{link ? (
				<Link
					className={classNames(styles.button, styles[variant], className)}
					href={link}
				>
					{children}
				</Link>
			) : (
				<button
					className={classNames(styles.button, styles[variant], className)}
					{...props}
				>
					{children}
				</button>
			)}
		</>
	)
}
