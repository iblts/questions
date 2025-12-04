'use client'

import { type MatchCard } from '@/features/match'
import { Question } from '@/features/question'
import { ROUTES } from '@/shared/constants'
import type { LearningQuestion } from '@/shared/types'
import { Button } from '@/shared/ui'
import { replaceArrayElement } from '@/shared/utils/helpers'
import { useState } from 'react'
import { useTestStore } from '../../model/useTestStore'
import { TestMatch } from '../testMatch'
import { TestResult } from '../testResult'
import styles from './testQuestions.module.scss'

export const TestQuestions = ({
	questions,
	moduleId,
}: {
	questions: (LearningQuestion | MatchCard[])[]
	moduleId: string
}) => {
	const {
		questions: storeQuestions,
		startTest,
		finishTest,
		endTime,
	} = useTestStore()

	const [scores, setScores] = useState<number[]>(() =>
		new Array(questions.length).fill(0)
	)

	if (storeQuestions.length === 0) {
		return (
			<div>
				<p className={styles.text}>Когда вы нажмёте на кнопку, пойдёт время.</p>
				<div className={styles.buttons}>
					<Button onClick={() => startTest(questions)}>Начать тест</Button>
					<Button link={`${ROUTES.MODULE}/${moduleId}`} variant='secondary'>
						Вернуться
					</Button>
				</div>
			</div>
		)
	}

	if (endTime) {
		return <TestResult />
	}

	return (
		<ul className={styles.list}>
			{questions.map((question, i) => (
				<li key={i} className={styles.card}>
					{Array.isArray(question) ? (
						<TestMatch
							key={i}
							cards={question}
							setScore={(score: number) =>
								setScores(prev => replaceArrayElement(prev, i, score))
							}
						/>
					) : (
						<Question
							question={question}
							key={i}
							isTest
							setScore={(score: number) =>
								setScores(prev => replaceArrayElement(prev, i, score))
							}
						/>
					)}
				</li>
			))}
			<Button onClick={() => finishTest(scores)} className={styles.endButton}>
				Завершить
			</Button>
		</ul>
	)
}
