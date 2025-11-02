import { InputProps } from '@/shared/types'
import classNames from 'classnames'
import styles from './styles.module.scss'

export const Input = ({
	label,
	error,
	reference,
	className,
	register,
	labelBelow = false,
	variant = 'primary',
	...props
}: InputProps) => {
	return (
		<label className={classNames(styles.body, className)}>
			{!labelBelow && label && <p className={styles.label}>{label}</p>}
			<input
				type='text'
				ref={reference}
				className={classNames(styles.input, styles[variant], {
					[styles.error]: !!error,
				})}
				autoComplete='off'
				autoCorrect='off'
				spellCheck='false'
				{...props}
				{...register}
			/>
			{labelBelow
				? (error || label) && (
						<p
							className={classNames(styles.label, { [styles.error]: !!error })}
						>
							{error || label}
						</p>
				  )
				: error && <p className={styles.error}>{error}</p>}
		</label>
	)
}
