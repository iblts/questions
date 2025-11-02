import { getRandomItems } from '@/shared/utils/helpers'
import type { Card } from '@prisma/client'
import { MatchCard } from './types'

export const generateMatchCards = (cardsProgress: Card[]) => {
	const length = Math.min(cardsProgress.length, 6)
	const cards = getRandomItems(cardsProgress, length)
	const emptyIndexes = new Set(new Array(length * 2).fill('').map((_, i) => i))
	const result: MatchCard[] = []
	let cardIndex = 0

	while (emptyIndexes.size > 0) {
		const indexes = getRandomItems(emptyIndexes.keys()?.toArray(), 2)
		indexes.forEach((index, i) => {
			emptyIndexes.delete(index)
			result[index] =
				i === 0
					? { text: cards[cardIndex].termin, answer: indexes[1] }
					: { text: cards[cardIndex].definition, answer: indexes[0] }
		})
		cardIndex++
	}

	return result
}
