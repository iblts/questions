'use client'

import { FlashCard } from '@/entities/card'
import { LeftArrow, RightArrow } from '@/shared/ui'
import { Card } from '@prisma/client'
import { useState } from 'react'
import styles from './styles.module.scss'

export default function CardsViewer({ cards }: { cards: Card[] }) {
	const [currentCardIndex, setCurrentCardIndex] = useState(0)

	return (
		<div className={styles.cardsViewer}>
			<FlashCard card={cards[currentCardIndex]} />
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
