import type { LearningQuestion } from '@/shared/types'
import Question1 from '../stage1'
import Question2 from '../stage2'

export default function Question({
	question,
	nextQuestion,
}: {
	question: LearningQuestion
	nextQuestion: () => void
}) {
	return (
		<>
			{'variants' in question ? (
				<Question1 question={question} nextQuestion={nextQuestion} />
			) : (
				<Question2 question={question} nextQuestion={nextQuestion} />
			)}
		</>
	)
}
