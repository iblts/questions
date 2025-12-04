'use client'

import { Button } from '@/shared/ui'
import { millisecondsToTime } from '@/shared/utils/helpers'
import type { Card } from '@prisma/client'
import { MatchCard as MatchCardType } from '../../model/types'
import { useMatchCards } from '../../model/useMatchCards'
import { MatchCard } from '../card'
import { MatchCardsResult } from '../result'
import styles from './cards-list.module.scss'

export const MatchCardsList = ({
	cards: initialCards,
	allCards,
}: {
	cards: MatchCardType[]
	allCards: Card[]
}) => {
	const {
		onSelect,
		cards,
		isErrorCard,
		onReset,
		selectedCardIndex,
		isEnd,
		time,
		isStart,
		handleStart,
	} = useMatchCards(initialCards, allCards)

	if (!isStart)
		return (
			<section className={styles.startScreen}>
				<h2>Режим Подбор</h2>
				<p>
					{`Этот режим на время. Ваша задача: находить пары термин - определение. Нажмите "Начать", чтобы запустить таймер и начать режим.`}
				</p>
				<Button onClick={handleStart}>Начать</Button>
			</section>
		)

	if (isEnd) return <MatchCardsResult result={time} onReset={onReset} />

	return (
		<section>
			<span className={styles.time}>{millisecondsToTime(time)}</span>
			<ul className={styles.list}>
				{cards.map((card, i) => (
					<MatchCard
						key={i}
						text={card?.text}
						onClick={() => onSelect(i)}
						selected={selectedCardIndex === i}
						error={isErrorCard(i)}
					/>
				))}
			</ul>
		</section>
	)
}
