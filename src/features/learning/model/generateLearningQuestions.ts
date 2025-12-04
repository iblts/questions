import type {
	CardProgressWithRelations,
	LearningQuestion,
	SelectQuestion,
	TestQuestion,
} from '@/shared/types'

export const generateLearningQuestions = (
	cardsProgress: CardProgressWithRelations[],
	mode: 1 | 2 = 1
): LearningQuestion[] => {
	const eligibleCards = cardsProgress.filter(card => card.stage !== 3)
	const questions: LearningQuestion[] = []
	const questionsCount = Math.min(eligibleCards.length, 10)

	for (let i = 0; i < questionsCount; i++) {
		const progress = eligibleCards[i]
		const { card } = progress

		const termin = mode === 1 ? card.termin : card.definition
		const definition = mode === 1 ? card.definition : card.termin

		if (progress.stage === 1) {
			const question: SelectQuestion = {
				cardId: progress.cardId,
				termin: termin,
				definitionIndex: 0,
				variants: [definition],
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
				const variant =
					mode === 1 ? candidate.card.definition : candidate.card.termin

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
