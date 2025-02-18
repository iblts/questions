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
			{label && (
				<p className={classNames(styles.label, { [styles.error]: !!error })}>
					{error || label}
				</p>
			)}
			<input
				type='text'
				ref={reference}
				className={classNames(styles.input, { [styles.error]: !!error })}
				{...props}
				{...register}
			/>
		</label>
	)
}
