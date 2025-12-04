'use client'

import classNames from 'classnames'
import type { ButtonHTMLAttributes, MouseEvent } from 'react'
import styles from './styles.module.scss'

export interface RadioButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement> {
	isActive?: boolean
	setActive?: (value: boolean) => void
	label?: string
}

export default function RadioButton({
	isActive,
	setActive,
	label,
	...props
}: RadioButtonProps) {
	const handleClick = (e?: MouseEvent<HTMLButtonElement>) => {
		e?.preventDefault()
		if (!isActive) setActive?.(true)
	}

	return (
		<label className={styles.body}>
			<button
				className={classNames(styles.input)}
				onClick={handleClick}
				{...props}
			>
				{isActive ? (
					<svg
						width='24'
						height='25'
						viewBox='0 0 24 25'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M12 2.63672C6.48 2.63672 2 7.11672 2 12.6367C2 18.1567 6.48 22.6367 12 22.6367C17.52 22.6367 22 18.1567 22 12.6367C22 7.11672 17.52 2.63672 12 2.63672ZM12 20.6367C7.59 20.6367 4 17.0467 4 12.6367C4 8.22672 7.59 4.63672 12 4.63672C16.41 4.63672 20 8.22672 20 12.6367C20 17.0467 16.41 20.6367 12 20.6367ZM12 8.63672C9.79 8.63672 8 10.4267 8 12.6367C8 14.8467 9.79 16.6367 12 16.6367C14.21 16.6367 16 14.8467 16 12.6367C16 10.4267 14.21 8.63672 12 8.63672Z'
							fill='#747474'
						/>
					</svg>
				) : (
					<svg
						width='24'
						height='25'
						viewBox='0 0 24 25'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M12 2.63672C6.48 2.63672 2 7.11672 2 12.6367C2 18.1567 6.48 22.6367 12 22.6367C17.52 22.6367 22 18.1567 22 12.6367C22 7.11672 17.52 2.63672 12 2.63672ZM12 20.6367C7.59 20.6367 4 17.0467 4 12.6367C4 8.22672 7.59 4.63672 12 4.63672C16.41 4.63672 20 8.22672 20 12.6367C20 17.0467 16.41 20.6367 12 20.6367Z'
							fill='#747474'
						/>
					</svg>
				)}
			</button>
			{label && (
				<p className={styles.label} onClick={() => handleClick()}>
					{label}
				</p>
			)}
		</label>
	)
}
