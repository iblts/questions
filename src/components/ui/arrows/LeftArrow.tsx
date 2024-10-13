import { IconArrow } from '@/components'
import { Dispatch, SetStateAction } from 'react'
import styles from './Arrow.module.scss'

export default function LeftArrow({
	index,
	setCurrentCardIndex,
}: {
	index: number
	setCurrentCardIndex: Dispatch<SetStateAction<number>>
}) {
	return (
		<button
			className={`${styles.body} ${index === 0 && styles.disabled} ${
				styles.rotated
			}`}
			onClick={() => {
				if (index === 0) return
				setCurrentCardIndex(prev => prev - 1)
			}}
		>
			<IconArrow />
		</button>
	)
}
