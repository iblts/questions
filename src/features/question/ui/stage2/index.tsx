'use client'

import type { TestQuestion } from '@/shared/types/question'
import { Button, Input } from '@/shared/ui'
import classNames from 'classnames'
import { useState } from 'react'
import styles from '../question/styles.module.scss'

interface Question2Props {
	question: TestQuestion
	nextQuestion?: () => void
	onUpdateStage?: () => void
	isTest?: boolean
	setScore?: (score: number) => void
	showAnswer: boolean
}

export default function Question2({
	question,
	nextQuestion,
	onUpdateStage,
	isTest = false,
	setScore,
	showAnswer,
}: Question2Props) {
	const handleAnswer = () => {
		setAnswered(true)
		if (
			question.definition.trim().toLocaleLowerCase() ===
			answer.trim().toLocaleLowerCase()
		) {
			onUpdateStage?.()
			setAnswer('')
			nextQuestion?.()
			setAnswered(false)
		}
	}

	const handleNext = () => {
		setAnswered(false)
		setAnswer('')
		nextQuestion?.()
	}

	const [answer, setAnswer] = useState('')
	const [answered, setAnswered] = useState(false)

	const handleChange = (text: string) => {
		setAnswer(text)
		if (isTest && setScore) {
			setScore(text === question.definition ? 100 : 0)
		}
	}

	return (
		<div
			className={classNames(styles.question, { [styles.writingTest]: isTest })}
		>
			<div className={styles.label}>Определение</div>
			<div className={styles.termin}>{question.termin}</div>
			<div className={styles.explanation}>Введите правильный ответ</div>
			<form onSubmit={e => e.preventDefault()} className={styles.form}>
				<Input
					type='text'
					name='answer'
					value={answer}
					onChange={e => !answered && handleChange(e.target.value)}
					disabled={showAnswer}
				/>
				{(!isTest || showAnswer) &&
					(answered || showAnswer ? (
						<>
							<p className={styles.uncorrect}>
								{answer.toLocaleLowerCase() ===
								question.definition.toLocaleLowerCase()
									? 'Верно!'
									: `Неверно. Правильный ответ: ${question.definition}`}
							</p>
							{!isTest && (
								<div className={styles.buttons}>
									<Button onClick={handleNext}>Дальше</Button>
									<Button
										onClick={() => {
											onUpdateStage?.()
											handleNext()
										}}
										variant='secondary'
									>
										Я ответил правильно
									</Button>
								</div>
							)}
						</>
					) : (
						!isTest && (
							<Button onClick={handleAnswer} className={styles.nextBtn}>
								Ответить
							</Button>
						)
					))}
			</form>
		</div>
	)
}
