import {
	getCardProgressByModuleId,
	resetCardsProgressStages,
	updateCardProgress,
} from '@/entities/cardProgress'
import { QUERY_KEYS } from '@/shared/constants'
import { queryClient } from '@/shared/providers'
import type {
	CardProgressWithRelations,
	LearningQuestion,
} from '@/shared/types'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { generateLearningQuestions } from './generateLearningQuestions'

const useCardProgress = (
	moduleId: string,
	initialData?: CardProgressWithRelations[]
) => {
	return useQuery({
		queryKey: [QUERY_KEYS.CARD_PROGRESS],
		queryFn: () => getCardProgressByModuleId(moduleId),
		refetchOnWindowFocus: false,
		initialData,
	})
}

const useMutateCardProgressStage = () => {
	return useMutation({
		mutationFn: ({ cardId, stage }: { cardId: string; stage: 2 | 3 }) =>
			updateCardProgress(cardId, { stage }),
		onSuccess: updatedCardProgress => {
			queryClient.setQueryData(
				[QUERY_KEYS.CARD_PROGRESS],
				(prevData: CardProgressWithRelations[]) =>
					prevData.map(cp =>
						cp.cardId === updatedCardProgress?.cardId ? updatedCardProgress : cp
					)
			)
		},
	})
}

const useResetCardProgressStage = () => {
	return useMutation({
		mutationFn: (cards: CardProgressWithRelations[]) =>
			resetCardsProgressStages(cards),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CARD_PROGRESS })
		},
	})
}

export const useLearning = (
	cardsProgress: CardProgressWithRelations[],
	initialQuestions: LearningQuestion[]
) => {
	const [questions, setQuestions] = useState(initialQuestions)
	const [questionIndex, setQuestionIndex] = useState(0)
	const question = questions[questionIndex]
	const resetStage = useResetCardProgressStage()
	const updateStage = useMutateCardProgressStage()
	const { data: cardProgress, refetch } = useCardProgress(
		cardsProgress[0].card.moduleId,
		cardsProgress
	)
	const [pendingMutations, setPendingMutations] = useState<
		Promise<CardProgressWithRelations | undefined>[]
	>([])
	const [isGenerating, setIsGenerating] = useState(false)

	const onResetStage = async () => {
		setIsGenerating(true)
		await resetStage.mutateAsync(cardProgress ?? [])
		const data = await refetch()
		setQuestions(generateLearningQuestions(data.data ?? []))
		setQuestionIndex(0)
		setIsGenerating(false)
	}

	const onRepeat = async () => {
		setIsGenerating(true)
		await Promise.all(pendingMutations)
		const updatedCardProgress: CardProgressWithRelations[] | undefined =
			queryClient.getQueryData([QUERY_KEYS.CARD_PROGRESS])
		setQuestions(generateLearningQuestions(updatedCardProgress ?? []))
		setQuestionIndex(0)
		setIsGenerating(false)
	}

	const onUpdateStage = async (cardId: string, stage: 2 | 3) => {
		const mutationPromise = updateStage.mutateAsync({ cardId, stage })
		setPendingMutations(prev => [...prev, mutationPromise])
		await mutationPromise
		setPendingMutations(prev => prev.filter(p => p !== mutationPromise))
	}

	return {
		question,
		questionsCount: questions.length,
		nextQuestion: () => setQuestionIndex(prev => prev + 1),
		questionIndex,
		onResetStage,
		onRepeat,
		onUpdateStage,
		isGenerating,
	}
}
