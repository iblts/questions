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
}: {
	question: SelectQuestion
	nextQuestion: () => void
	onUpdateStage: () => void
}) {
	const handleAnswer = (index: number) => {
		setSelectedAnswer(index)

		if (index === question.definitionIndex) {
			nextQuestion()
			onUpdateStage()
			setSelectedAnswer(null)
		}
	}
	const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)

	return (
		<div className={styles.question}>
			<div className={styles.label}>Определение</div>
			<div className={styles.termin}>{question.termin}</div>
			<div className={styles.explanation}>Выберите правильный ответ</div>
			<div
				className={classNames(
					styles.answers,
					selectedAnswer !== null && styles.disabled
				)}
			>
				{question.variants.map((answer: string, index: number) => (
					<div
						className={classNames(styles.answer, {
							[styles.right]:
								selectedAnswer === index && index === question.definitionIndex,
							[styles.wrong]: selectedAnswer === index,
							[styles.misstake]:
								selectedAnswer !== null && index === question.definitionIndex,
						})}
						key={index}
						onClick={() => handleAnswer(index)}
					>
						<span className={styles.number}>{index + 1}</span>
						{answer}
					</div>
				))}
			</div>
			{selectedAnswer !== null && (
				<Button
					onClick={() => {
						nextQuestion()
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
