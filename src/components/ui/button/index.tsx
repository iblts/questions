import classNames from 'classnames'
import type { ButtonHTMLAttributes } from 'react'
import styles from './styles.module.scss'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button({ children, className, ...props }: Props) {
	return (
		<button className={classNames(styles.button, className)} {...props}>
			{children}
		</button>
	)
}
