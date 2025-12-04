import classNames from 'classnames'
import type { ReactNode } from 'react'
import styles from './styles.module.scss'

export const Label = ({
	children,
	className,
}: {
	children: ReactNode
	className?: string
}) => {
	return (
		<label className={classNames(styles.label, className)}>{children}</label>
	)
}
