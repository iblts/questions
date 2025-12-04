import { replaceArrayElement } from '@/shared/utils/helpers'
import type { Card } from '@prisma/client'
import { useRef, useState } from 'react'
import { setTimeout } from 'timers'
import { generateMatchCards } from './generateMatchCards'
import type { MatchCard } from './types'

export const useMatchCards = (
	initialCards: MatchCard[] = [],
	allCards: Card[]
) => {
	const [cards, setCards] = useState<(MatchCard | undefined)[]>(initialCards)
	const [selectedCardIndex, setSelectedCardIndex] = useState<number>()
	const [fail, setFail] = useState<number>()
	const [time, setTime] = useState(0)
	const [isStart, setStart] = useState(false)
	const isEnd = cards.every(card => card === undefined)
	const failTimeoutRef = useRef<NodeJS.Timeout>(undefined)
	const intervalRef = useRef<NodeJS.Timeout>(undefined)

	const handleStart = () => {
		setStart(true)
		setTime(0)
		intervalRef.current = setInterval(() => {
			if (time === 60 * 60 * 1000) {
				setStart(false)
				clearInterval(intervalRef.current)
			}
			setTime(prev => prev + 100)
		}, 100)

		return () => {
			clearInterval(intervalRef.current)
		}
	}

	const removeSolvedCards = (index1: number, index2: number) => {
		const newArray = replaceArrayElement(
			replaceArrayElement(cards, index1, undefined),
			index2,
			undefined
		)
		setCards(newArray)
	}

	const onSelect = (index: number) => {
		if (selectedCardIndex !== undefined) {
			if (index === selectedCardIndex) {
				setSelectedCardIndex(undefined)
			} else {
				if (index === cards[selectedCardIndex]?.answer) {
					if (cards.filter(card => card).length === 2) {
						clearInterval(intervalRef.current)
					}
					removeSolvedCards(selectedCardIndex, index)
					setSelectedCardIndex(undefined)
				} else {
					setFail(index)
					setTime(prev => prev + 3000)
					failTimeoutRef.current = setTimeout(() => {
						setFail(undefined)
						setSelectedCardIndex(undefined)
					}, 600)
				}
			}
		} else {
			setSelectedCardIndex(index)
		}

		return () => clearTimeout(failTimeoutRef.current)
	}

	const onReset = () => {
		setCards(generateMatchCards(allCards))
		handleStart()
	}

	const isErrorCard = (index: number) => {
		if (fail === undefined) return false
		return fail === index || selectedCardIndex === index
	}

	return {
		time,
		cards,
		onSelect,
		onReset,
		selectedCardIndex,
		isErrorCard,
		isEnd,
		handleStart,
		isStart,
	}
}
