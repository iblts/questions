'use client'

import { FlashCard } from '@/entities/card'
import { ModuleWithRelations } from '@/shared/types'
import { LeftArrow, RightArrow } from '@/shared/ui'
import { useState } from 'react'
import styles from './styles.module.scss'

export default function CardsViewer({
	module,
}: {
	module: ModuleWithRelations
}) {
	const [currentCardIndex, setCurrentCardIndex] = useState(0)
	const cards = module.cards

	return (
		<div className={styles.cardsViewer}>
			<FlashCard card={cards[currentCardIndex]} authorId={module.authorId} />
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
