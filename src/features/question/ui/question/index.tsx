import type { LearningQuestion } from '@/shared/types'
import Question1 from '../stage1'
import Question2 from '../stage2'

export default function Question({
	question,
	nextQuestion,
	onUpdateStage,
}: {
	question: LearningQuestion
	nextQuestion: () => void
	onUpdateStage: (cardId: string, stage: 2 | 3) => void
}) {
	return (
		<>
			{'variants' in question ? (
				<Question1
					question={question}
					nextQuestion={nextQuestion}
					onUpdateStage={() => onUpdateStage(question.cardId, 2)}
				/>
			) : (
				<Question2
					question={question}
					nextQuestion={nextQuestion}
					onUpdateStage={() => onUpdateStage(question.cardId, 3)}
				/>
			)}
		</>
	)
}
