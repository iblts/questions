'use client'

import classNames from 'classnames'
import Link from 'next/link'
import type { ButtonHTMLAttributes } from 'react'
import styles from './styles.module.scss'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'primary' | 'secondary'
	link?: string
	background?: string
	color?: string
}

export default function Button({
	children,
	className,
	variant = 'primary',
	link,
	background,
	color,
	...props
}: Props) {
	return (
		<>
			{link ? (
				<Link
					className={classNames(styles.button, styles[variant], className)}
					href={link}
					style={
						{
							'--button-color': color,
							'--button-background': background,
						} as React.CSSProperties
					}
				>
					{children}
				</Link>
			) : (
				<button
					className={classNames(styles.button, styles[variant], className)}
					style={
						{
							'--button-color': color,
							'--button-background': background,
						} as React.CSSProperties
					}
					{...props}
				>
					{children}
				</button>
			)}
		</>
	)
}
