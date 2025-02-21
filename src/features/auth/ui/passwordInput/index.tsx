import type { InputProps } from '@/shared/types'
import { IconEyeClose, IconEyeOpen } from '@/shared/ui'
import classNames from 'classnames'
import { useState } from 'react'
import styles from './styles.module.scss'

export default function PasswordInput({
	label,
	error,
	reference,
	className,
	register,
	...props
}: InputProps) {
	const [isShowPassword, setShowPassword] = useState(false)

	return (
		<label className={classNames(styles.label, className)}>
			{label && <p className={styles.labelText}>{label}</p>}
			<div className={styles.passwordInput}>
				<input
					ref={reference}
					className={classNames(styles.input, { [styles.error]: !!error })}
					autoComplete='false'
					{...props}
					{...register}
					type={isShowPassword ? 'text' : 'password'}
				/>
				<span>
					{isShowPassword ? (
						<IconEyeOpen
							onClick={e => {
								e.stopPropagation()
								setShowPassword(false)
							}}
						/>
					) : (
						<IconEyeClose
							onClick={e => {
								e.stopPropagation()
								setShowPassword(true)
							}}
						/>
					)}
				</span>
			</div>
			{error && <p className={styles.error}>{error}</p>}
		</label>
	)
}
