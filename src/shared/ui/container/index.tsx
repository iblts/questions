import classNames from 'classnames'
import type { ReactNode } from 'react'
import styles from './styles.module.scss'

interface Props {
	className?: string
	width?: number
	children: ReactNode
	padding?: number
}

export const Container = ({
	className,
	width = 1400,
	children,
	padding = 20,
}: Props) => {
	return (
		<div
			className={classNames(styles.container, className)}
			style={{
				maxWidth: width,
				paddingLeft: padding,
				paddingRight: padding,
			}}
		>
			{children}
		</div>
	)
}
