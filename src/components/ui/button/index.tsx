import type { ReactNode } from 'react'
import styles from './styles.module.scss'

export default function Button({
	children,
	onClick,
}: {
	children: ReactNode | ReactNode[]
	onClick?: () => void
}) {
	return (
		<button className={styles.button} onClick={onClick}>
			{children}
		</button>
	)
}
