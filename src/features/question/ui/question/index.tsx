'use client'

import type { LearningQuestion } from '@/shared/types'
import Question1 from '../stage1'
import Question2 from '../stage2'

interface QuestionProps {
	question: LearningQuestion
	nextQuestion?: () => void
	onUpdateStage?: (cardId: string, stage: 2 | 3) => void
	isTest?: boolean
	setScore?: (score: number) => void
	showAnswer?: boolean
}

export default function Question({
	question,
	nextQuestion,
	onUpdateStage,
	isTest = false,
	setScore,
	showAnswer = false,
}: QuestionProps) {
	return (
		<>
			{'variants' in question ? (
				<Question1
					question={question}
					nextQuestion={nextQuestion}
					onUpdateStage={() => onUpdateStage?.(question.cardId, 2)}
					isTest={isTest}
					setScore={setScore}
					showAnswer={showAnswer}
				/>
			) : (
				<Question2
					question={question}
					nextQuestion={nextQuestion}
					onUpdateStage={() => onUpdateStage?.(question.cardId, 3)}
					isTest={isTest}
					setScore={setScore}
					showAnswer={showAnswer}
				/>
			)}
		</>
	)
}
