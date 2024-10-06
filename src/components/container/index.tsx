import classNames from 'classnames'
import type { ReactNode } from 'react'
import styles from './styles.module.scss'

interface Props {
	className?: string
	width?: number
	children: ReactNode
}

export default function Container({
	className,
	width = 1200,
	children,
}: Props) {
	return (
		<div
			className={classNames(styles.container, className)}
			style={{
				maxWidth: width,
			}}
		>
			{children}
		</div>
	)
}
