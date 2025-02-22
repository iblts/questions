'use client'

import { IconHint } from '@/shared/ui'
import { Card } from '@prisma/client'
import classnames from 'classnames'
import { useState } from 'react'
import EditCardButton from '../editCardButton'
import styles from './styles.module.scss'

export default function FlashCard({
	card,
	authorId,
}: {
	card: Card
	authorId?: string | null
}) {
	const [showAnswer, setShowAnswer] = useState(false)
	const [showHint, setShowHint] = useState(false)

	return (
		<div
			className={`${styles.body} ${showAnswer && styles.rotated}`}
			onClick={() => setShowAnswer(prev => !prev)}
		>
			<div className={classnames(styles.header, showAnswer && styles.rotated)}>
				{!showAnswer && (
					<div
						className={`${styles.hint} ${showHint && styles.showHint}`}
						onClick={e => {
							e.stopPropagation()
							setShowHint(prev => !prev)
						}}
					>
						<IconHint />
						{showHint ? card?.definition[0] + '__________' : 'Подсказка'}
					</div>
				)}
				<EditCardButton authorId={authorId} card={card} />
			</div>
			<div className={styles.card}>
				{showAnswer ? (
					<div className={styles.answer}>{card?.definition}</div>
				) : (
					<div className={styles.question}>{card?.termin}</div>
				)}
			</div>
		</div>
	)
}
