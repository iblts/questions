import classNames from 'classnames'
import type { InputHTMLAttributes } from 'react'
import styles from './styles.module.scss'

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

export default function Input({ className, ...props }: Props) {
	return <input className={classNames(styles.input, className)} {...props} />
}
