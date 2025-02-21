import { InputProps } from '@/shared/types'
import classNames from 'classnames'
import styles from './styles.module.scss'

export default function Input({
	label,
	error,
	reference,
	className,
	register,
	...props
}: InputProps) {
	return (
		<label className={className}>
			{label && <p className={styles.label}>{label}</p>}
			<input
				type='text'
				ref={reference}
				className={classNames(styles.input, { [styles.error]: !!error })}
				autoComplete='false'
				{...props}
				{...register}
			/>
			{error && <p className={styles.error}>{error}</p>}
		</label>
	)
}
