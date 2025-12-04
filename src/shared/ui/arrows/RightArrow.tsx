import { IconArrow } from '@/shared/ui'
import { Dispatch, SetStateAction } from 'react'
import styles from './Arrow.module.scss'

export const RightArrow = ({
	index,
	length,
	setCurrentCardIndex,
}: {
	index: number
	length: number
	setCurrentCardIndex: Dispatch<SetStateAction<number>>
}) => {
	return (
		<button
			className={`${styles.body} ${index === length - 1 && styles.disabled}`}
			onClick={() => {
				if (index === length - 1) return
				setCurrentCardIndex((prev: number) => prev + 1)
			}}
		>
			<IconArrow />
		</button>
	)
}
