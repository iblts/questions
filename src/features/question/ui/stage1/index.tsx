'use client'

import type { SelectQuestion } from '@/shared/types/question'
import { Button } from '@/shared/ui'
import classNames from 'classnames'
import { useState } from 'react'
import styles from '../question/styles.module.scss'

export default function Question1({
	question,
	nextQuestion,
	onUpdateStage,
	isTest = false,
	setScore,
}: {
	question: SelectQuestion
	nextQuestion?: () => void
	onUpdateStage?: () => void
	isTest?: boolean
	setScore?: (score: number) => void
}) {
	const handleAnswer = (index: number) => {
		setSelectedAnswer(index)

		if (index === question.definitionIndex && !isTest) {
			nextQuestion?.()
			onUpdateStage?.()
			setSelectedAnswer(null)
		}

		if (isTest && setScore) {
			setScore(index === question.definitionIndex ? 100 : 0)
		}
	}
	const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)

	return (
		<div className={styles.question}>
			<p className={styles.label}>Определение</p>
			<p className={styles.termin}>{question.termin}</p>
			<p className={styles.explanation}>Выберите правильный ответ</p>
			<ul
				className={classNames(styles.answers, {
					[styles.disabled]: selectedAnswer !== null && !isTest,
				})}
			>
				{question.variants.map((answer: string, index: number) => (
					<li key={index}>
						<button
							className={classNames(styles.answer, {
								[styles.right]:
									!isTest &&
									selectedAnswer === index &&
									index === question.definitionIndex,
								[styles.wrong]: !isTest && selectedAnswer === index,
								[styles.misstake]:
									!isTest &&
									selectedAnswer !== null &&
									index === question.definitionIndex,
								[styles.select]: index === selectedAnswer && isTest,
							})}
							onClick={() => handleAnswer(index)}
						>
							<span className={styles.number}>{index + 1}</span>
							{answer}
						</button>
					</li>
				))}
			</ul>
			{!isTest && selectedAnswer !== null && (
				<Button
					onClick={() => {
						nextQuestion?.()
						setSelectedAnswer(null)
					}}
					className={styles.nextBtn}
				>
					Дальше
				</Button>
			)}
		</div>
	)
}
