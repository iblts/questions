import type {
	CardProgressWithRelations,
	LearningQuestion,
	SelectQuestion,
	TestQuestion,
} from '@/shared/types'

export function generateLearningQuestions(
	cardsProgress: CardProgressWithRelations[]
) {
	const questions: LearningQuestion[] = []

	const questionsLength = Math.min(cardsProgress.length, 10)

	let cardsCopy = cardsProgress.slice()

	for (let i = 0; i < questionsLength; i++) {
		const card = cardsProgress[i].card

		if (cardsProgress[i].stage === 1) {
			const question: SelectQuestion = {
				cardId: cardsProgress[i].id,
				termin: card.termin,
				definitionIndex: 0,
				variants: [card.definition],
			}

			cardsCopy = cardsCopy.filter((_, index) => index !== i)

			const variantsLength = Math.min(4, cardsProgress.length)

			while (question.variants.length < variantsLength) {
				const randomIndex = Math.floor(Math.random() * cardsCopy.length)
				const variant = cardsCopy[randomIndex].card.definition
				if (Math.random() > 0.5) {
					question.variants.push(variant)
				} else {
					question.variants.unshift(variant)
					question.definitionIndex++
				}
				cardsCopy = cardsCopy.filter((_, index) => index !== randomIndex)
			}

			questions.push(question)
			cardsCopy = cardsProgress.slice()
		} else if (cardsProgress[i].stage === 2) {
			const question: TestQuestion = {
				cardId: cardsProgress[i].id,
				termin: card.termin,
				definition: card.definition,
			}
			questions.push(question)
		}
	}

	return questions
}
