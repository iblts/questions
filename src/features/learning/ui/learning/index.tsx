'use client'

import { Question } from '@/features/question'
import { CardProgressWithRelations } from '@/shared/types'
import { ProgressBar } from '@/shared/ui'
import { useLearning } from '../../model/hooks'
import Congratulations from '../congratulations'
import styles from './styles.module.scss'

export default function Learning({
	cardsProgress,
}: {
	cardsProgress: CardProgressWithRelations[]
}) {
	const {
		question,
		questionIndex,
		questionsCount,
		isGenerating,
		onRepeat,
		onResetStage,
		nextQuestion,
		onUpdateStage,
	} = useLearning(cardsProgress)

	return (
		<div className={styles.body}>
			<ProgressBar currentLength={questionIndex} totalLength={questionsCount} />
			{isGenerating ? (
				<div className={styles.loading}>
					<p>Генерация новых вопросов...</p>
				</div>
			) : questionIndex === questionsCount ? (
				<Congratulations
					questionsCount={questionsCount}
					onRepeat={onRepeat}
					onReset={onResetStage}
				/>
			) : (
				<Question
					question={question}
					nextQuestion={nextQuestion}
					onUpdateStage={onUpdateStage}
				/>
			)}
		</div>
	)
}
