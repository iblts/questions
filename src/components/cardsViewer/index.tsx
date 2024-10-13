'use client'

import { CardProgressWithRelations } from '@/types'
import { useState } from 'react'
import { FlashCard, LeftArrow, RightArrow } from '..'
import styles from './styles.module.scss'

export default function CardsViewer({
	cards,
}: {
	cards: CardProgressWithRelations[]
}) {
	const [currentCardIndex, setCurrentCardIndex] = useState(0)

	return (
		<div className={styles.cardsViewer}>
			<FlashCard card={cards[currentCardIndex].card} />
			<div className={styles.controlls}>
				<LeftArrow
					index={currentCardIndex}
					setCurrentCardIndex={setCurrentCardIndex}
				/>
				<div className={styles.index}>
					{currentCardIndex + 1} / {cards.length}
				</div>
				<RightArrow
					setCurrentCardIndex={setCurrentCardIndex}
					index={currentCardIndex}
					length={cards.length}
				/>
			</div>
		</div>
	)
}
