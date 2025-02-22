'use client'

import { Question } from '@/features/question'
import { CardProgressWithRelations } from '@/shared/types'
import { Button, ProgressBar } from '@/shared/ui'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { generateLearningQuestions } from '../../model/generateLearningQuestions'
import styles from './styles.module.scss'

export default function Learning({
	cardsProgress,
}: {
	cardsProgress: CardProgressWithRelations[]
}) {
	const questions = generateLearningQuestions(cardsProgress)
	const [questionIndex, setQuestionIndex] = useState(0)
	const question = questions[questionIndex]

	const router = useRouter()

	// const resetStage = async () => {
	// 	await fetch(
	// 		`${process.env.API_URL}/moduleProgress/${cardsProgress[0].card.moduleId}`,
	// 		{
	// 			method: 'PUT',
	// 			cache: 'no-cache',
	// 			body: JSON.stringify(
	// 				cardsProgress.map(card => ({
	// 					cardProgress: {
	// 						id: card.,
	// 						cardId: card.cardId,
	// 						moduleId: card.moduleId,
	// 						stage: 1,
	// 					},
	// 				}))
	// 			),
	// 		}
	// 	)
	// }

	return (
		<div className={styles.body}>
			<ProgressBar
				currentLength={questionIndex}
				totalLength={questions.length}
			/>
			{questionIndex === questions.length ? (
				<div className={styles.congratulations}>
					{questions.length === 0 ? (
						<>
							Вопросы закончились
							<Button
								onClick={async () => {
									// await resetStage()
									router.refresh()
								}}
							>
								Заново
							</Button>
						</>
					) : (
						<Button
							onClick={async () => {
								router.refresh()
								setQuestionIndex(0)
							}}
						>
							Далее
						</Button>
					)}
				</div>
			) : (
				<Question
					question={question}
					nextQuestion={() => setQuestionIndex(prev => prev + 1)}
				/>
			)}
		</div>
	)
}
