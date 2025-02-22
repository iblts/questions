import classNames from 'classnames'
import type { HTMLAttributes, PropsWithChildren } from 'react'
import styles from './styles.module.scss'

interface Props extends HTMLAttributes<HTMLDivElement> {
	close: () => void
}

export default function Modal({
	children,
	close,
	className,
	...props
}: PropsWithChildren<Props>) {
	return (
		<div
			className={classNames(styles.overlay, className)}
			onClick={e => {
				e.stopPropagation()
				close()
			}}
			{...props}
		>
			<div
				className={styles.modal}
				onClick={e => {
					e.preventDefault()
					e.stopPropagation()
				}}
			>
				{children}
			</div>
		</div>
	)
}
