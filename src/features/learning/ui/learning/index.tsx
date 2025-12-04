'use client'

import { Question } from '@/features/question'
import type {
	CardProgressWithRelations,
	LearningQuestion,
} from '@/shared/types'
import { ProgressBar } from '@/shared/ui'
import { Loader } from '@/shared/ui/loader'
import { useLearning } from '../../model/hooks'
import Congratulations from '../congratulations'
import styles from './styles.module.scss'

export default function Learning({
	cardsProgress,
	questions,
}: {
	cardsProgress: CardProgressWithRelations[]
	questions: LearningQuestion[]
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
	} = useLearning(cardsProgress, questions)

	return (
		<div className={styles.body}>
			<ProgressBar currentLength={questionIndex} totalLength={questionsCount} />
			{isGenerating ? (
				<div className={styles.loading}>
					<Loader />
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
