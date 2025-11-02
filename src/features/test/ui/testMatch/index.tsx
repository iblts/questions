import type { MatchCard } from '@/features/match'
import { replaceArrayElement } from '@/shared/utils/helpers'
import classNames from 'classnames'
import { useState } from 'react'
import styles from './testMatch.module.scss'

export const TestMatch = ({
	cards,
	setScore,
}: {
	cards: MatchCard[]
	setScore: (score: number) => void
}) => {
	const terminsQuantity = cards.length / 2
	const [selectedIndex, setSelectedIndex] = useState<number>()
	const [answeredIndexes, setAnsweredIndexes] = useState<
		[number | null, number | null][]
	>(() => new Array(terminsQuantity).fill([null, null]))

	const handleAnswer = (i: number, j: number) => {
		const newAnswer = replaceArrayElement(
			answeredIndexes[i],
			j,
			selectedIndex ?? null
		) as [number | null, number | null]
		const newArray = replaceArrayElement(answeredIndexes, i, newAnswer)
		setSelectedIndex(undefined)
		setAnsweredIndexes(newArray)
		setScore(
			answeredIndexes.reduce((sum, cur) => {
				if (cur[0] && cur[1]) {
					return sum + cards[cur[0]].answer === cur[1]
						? 100 / terminsQuantity
						: 0
				} else {
					return sum
				}
			}, 0)
		)
	}

	const isAnswered = (i: number) => {
		return answeredIndexes.some(answers => answers[0] === i || answers[1] === i)
	}

	return (
		<section className={styles.match}>
			<ul className={styles.answers}>
				{answeredIndexes.map((answers, i) => (
					<li key={i}>
						<ul className={styles.slots}>
							{answers.map((answer, j) => (
								<li key={`${i}${j}`}>
									<button
										className={classNames(styles.slot, {
											[styles.open]: selectedIndex !== undefined,
										})}
										onClick={() => handleAnswer(i, j)}
									>
										{answer !== null && cards[answer].text}
									</button>
								</li>
							))}
						</ul>
					</li>
				))}
			</ul>
			<ul className={styles.list}>
				{cards.map((card, i) => {
					const answered = isAnswered(i)

					return (
						<li key={i}>
							<button
								className={classNames(styles.item, {
									[styles.select]: selectedIndex === i,
									[styles.answered]: answered,
								})}
								onClick={() => {
									if (!answered) setSelectedIndex(i)
								}}
							>
								{card.text}
							</button>
						</li>
					)
				})}
			</ul>
		</section>
	)
}
