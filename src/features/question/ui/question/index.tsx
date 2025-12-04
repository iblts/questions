'use client'

import type { LearningQuestion } from '@/shared/types'
import Question1 from '../stage1'
import Question2 from '../stage2'

export default function Question({
	question,
	nextQuestion,
	onUpdateStage,
	isTest = false,
	setScore,
}: {
	question: LearningQuestion
	nextQuestion?: () => void
	onUpdateStage?: (cardId: string, stage: 2 | 3) => void
	isTest?: boolean
	setScore?: (score: number) => void
}) {
	return (
		<>
			{'variants' in question ? (
				<Question1
					question={question}
					nextQuestion={nextQuestion}
					onUpdateStage={() => onUpdateStage?.(question.cardId, 2)}
					isTest={isTest}
					setScore={setScore}
				/>
			) : (
				<Question2
					question={question}
					nextQuestion={nextQuestion}
					onUpdateStage={() => onUpdateStage?.(question.cardId, 3)}
					isTest={isTest}
					setScore={setScore}
				/>
			)}
		</>
	)
}
