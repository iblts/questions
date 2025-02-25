import type {
	CardProgressWithRelations,
	LearningQuestion,
	SelectQuestion,
	TestQuestion,
} from '@/shared/types'

export function generateLearningQuestions(
	cardsProgress: CardProgressWithRelations[]
): LearningQuestion[] {
	const eligibleCards = cardsProgress.filter(card => card.stage !== 3)
	const questions: LearningQuestion[] = []
	const questionsCount = Math.min(eligibleCards.length, 10)

	for (let i = 0; i < questionsCount; i++) {
		const progress = eligibleCards[i]
		const { card } = progress

		if (progress.stage === 1) {
			const question: SelectQuestion = {
				cardId: progress.cardId,
				termin: card.termin,
				definitionIndex: 0,
				variants: [card.definition],
			}

			const candidates = eligibleCards
				.slice(0, i)
				.concat(eligibleCards.slice(i + 1))
			const variantsCount = Math.min(4, eligibleCards.length)

			while (
				question.variants.length < variantsCount &&
				candidates.length > 0
			) {
				const randomIndex = Math.floor(Math.random() * candidates.length)
				const candidate = candidates[randomIndex]
				const variant = candidate.card.definition

				if (Math.random() > 0.5) {
					question.variants.push(variant)
				} else {
					question.variants.unshift(variant)
					question.definitionIndex++
				}
				candidates.splice(randomIndex, 1)
			}
			questions.push(question)
		} else if (progress.stage === 2) {
			const question: TestQuestion = {
				cardId: progress.cardId,
				termin: card.termin,
				definition: card.definition,
			}
			questions.push(question)
		}
	}

	return questions
}
