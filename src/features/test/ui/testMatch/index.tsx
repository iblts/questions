import type { MatchCard } from '@/features/match'
import { replaceArrayElement } from '@/shared/utils/helpers'
import classNames from 'classnames'
import { useState } from 'react'
import styles from './testMatch.module.scss'

interface TestMatchProps {
	cards: MatchCard[]
	setScore: (score: number) => void
	showAnswer?: boolean
}

export const TestMatch = ({ cards, setScore, showAnswer }: TestMatchProps) => {
	const terminsQuantity = cards.length / 2
	const [selectedIndex, setSelectedIndex] = useState<number>()
	const [answeredIndexes, setAnsweredIndexes] = useState<
		[number | null, number | null][]
	>(() => new Array(terminsQuantity).fill([null, null]))

	const handleAnswer = (i: number, j: number) => {
		if (showAnswer) return

		const newAnswer = replaceArrayElement(
			answeredIndexes[i],
			j,
			selectedIndex ?? null
		) as [number | null, number | null]

		const newArray = replaceArrayElement(answeredIndexes, i, newAnswer)
		setSelectedIndex(undefined)
		setAnsweredIndexes(newArray)

		const totalScore = newArray.reduce((sum, [termIndex, defIndex]) => {
			if (termIndex != null && defIndex != null) {
				return sum + (cards[termIndex].answer === defIndex ? 100 : 0)
			}
			return sum
		}, 0)

		setScore(totalScore / terminsQuantity)
	}

	const isAnswered = (i: number) => {
		return answeredIndexes.some(answers => answers[0] === i || answers[1] === i)
	}

	return (
		<section className={styles.match}>
			<ul className={styles.answers}>
				{answeredIndexes.map((answers, i) => (
					<li key={i}>
						<ul
							className={classNames(styles.slots, {
								[styles.success]:
									showAnswer &&
									answers[0] !== null &&
									cards[answers[0]].answer === answers[1],
								[styles.fail]:
									showAnswer &&
									answers[0] !== null &&
									cards[answers[0]].answer !== answers[1],
							})}
						>
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
