import type { MatchCard } from '@/features/match'
import type {
	CardProgressWithRelations,
	LearningQuestion,
	SelectQuestion,
	TestQuestion,
} from '@/shared/types'
import { getRandomItems } from '@/shared/utils/helpers'

export const generateTestQuestions = (
	cardsProgress: CardProgressWithRelations[],
	totalCount: number,
	selectedTypes: ('write' | 'select' | 'match')[]
) => {
	const availableCards = cardsProgress.filter(card => card.stage !== 3)
	const questions: (LearningQuestion | MatchCard[])[] = []

	if (availableCards.length === 0) return []

	const perType = Math.floor(totalCount / selectedTypes.length)

	for (const type of selectedTypes) {
		const cards = getRandomItems(availableCards, perType)

		if (type === 'write') {
			// Вписать
			cards.forEach(c => {
				const q: TestQuestion = {
					cardId: c.cardId,
					termin: c.card.termin,
					definition: c.card.definition,
				}
				questions.push(q)
			})
		}

		if (type === 'select') {
			// Выбрать
			cards.forEach(progress => {
				const { card } = progress
				const q: SelectQuestion = {
					cardId: progress.cardId,
					termin: card.termin,
					definitionIndex: 0,
					variants: [card.definition],
				}

				const candidates = availableCards.filter(c => c.cardId !== card.id)
				const variantsCount = Math.min(4, availableCards.length)

				while (q.variants.length < variantsCount && candidates.length > 0) {
					const randomIndex = Math.floor(Math.random() * candidates.length)
					const candidate = candidates[randomIndex]
					const variant = candidate.card.definition

					if (Math.random() > 0.5) {
						q.variants.push(variant)
					} else {
						q.variants.unshift(variant)
						q.definitionIndex++
					}
					candidates.splice(randomIndex, 1)
				}
				questions.push(q)
			})
		}

		if (type === 'match') {
			// Совместить
			const length = Math.min(cards.length, 4)
			const subset = getRandomItems(cards, length)
			const emptyIndexes = new Set(
				new Array(length * 2).fill('').map((_, i) => i)
			)
			const matchCards: MatchCard[] = []
			let cardIndex = 0

			while (emptyIndexes.size > 0 && cardIndex < subset.length) {
				const indexes = getRandomItems(Array.from(emptyIndexes), 2)
				indexes.forEach((index, i) => {
					emptyIndexes.delete(index)
					matchCards[index] =
						i === 0
							? { text: subset[cardIndex].card.termin, answer: indexes[1] }
							: { text: subset[cardIndex].card.definition, answer: indexes[0] }
				})
				cardIndex++
			}
			questions.push(matchCards)
		}
	}

	return questions
}
