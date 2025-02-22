import { PropsWithChildren } from 'react'
import styles from './styles.module.scss'

export default function Modal({
	children,
	close,
}: PropsWithChildren<{ close: () => void }>) {
	return (
		<div className={styles.overlay} onClick={close}>
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
