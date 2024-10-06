'use client'

import { CardProgressWithRelations } from '@/types/cardProgress'
import { useState } from 'react'
import FlashCard from '../flashcard'
import LeftArrow from '../ui/arrows/LeftArrow'
import RightArrow from '../ui/arrows/RightArrow'
import styles from './CardsViewer.module.scss'

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
