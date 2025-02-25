'use client'

import type { TestQuestion } from '@/shared/types/question'
import { Button, Input } from '@/shared/ui'
import { useState } from 'react'
import styles from '../question/styles.module.scss'

export default function Question2({
	question,
	nextQuestion,
	onUpdateStage,
}: {
	question: TestQuestion
	nextQuestion: () => void
	onUpdateStage: () => void
}) {
	const handleAnswer = () => {
		setAnswered(true)
		if (
			question.definition.trim().toLocaleLowerCase() ===
			answer.trim().toLocaleLowerCase()
		) {
			onUpdateStage()
			setAnswer('')
			nextQuestion()
			setAnswered(false)
		}
	}

	const handleNext = () => {
		setAnswered(false)
		setAnswer('')
		nextQuestion()
	}

	const [answer, setAnswer] = useState('')
	const [answered, setAnswered] = useState(false)

	return (
		<div className={styles.question}>
			<div className={styles.label}>Определение</div>
			<div className={styles.termin}>{question.termin}</div>
			<div className={styles.explanation}>Введите правильный ответ</div>
			<form onSubmit={e => e.preventDefault()} className={styles.form}>
				<Input
					type='text'
					name='answer'
					value={answer}
					onChange={e => !answered && setAnswer(e.target.value)}
				/>
				{answered ? (
					<>
						<p className={styles.uncorrect}>
							Неверно. Правильный ответ: {question.definition}
						</p>
						<div className={styles.buttons}>
							<Button onClick={handleNext}>Дальше</Button>
							<Button
								onClick={() => {
									onUpdateStage()
									handleNext()
								}}
								variant='secondary'
							>
								Я ответил правильно
							</Button>
						</div>
					</>
				) : (
					<Button onClick={handleAnswer} className={styles.nextBtn}>
						Ответить
					</Button>
				)}
			</form>
		</div>
	)
}
