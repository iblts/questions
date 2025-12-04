'use client'

import type { MatchCard } from '@/features/match'
import type { LearningQuestion } from '@/shared/types'
import { create } from 'zustand'

export interface TestAnswer {
	cardId: string
	isCorrect: boolean
	userAnswer?: string
	correctAnswer?: string
}

interface TestState {
	questions: (LearningQuestion | MatchCard[])[]
	startTime: number | null
	endTime: number | null
	score: number
	startTest: (questions: (LearningQuestion | MatchCard[])[]) => void
	finishTest: (scores: number[]) => void
	resetTest: () => void
}

export const useTestStore = create<TestState>((set, get) => ({
	questions: [],
	startTime: null,
	endTime: null,
	score: 0,
	startTest: questions =>
		set({
			questions,
			startTime: Date.now(),
			endTime: null,
		}),
	finishTest: scores =>
		set({
			endTime: Date.now(),
			score: Math.round(
				scores.reduce((sum, cur) => sum + cur) / get().questions.length
			),
		}),
	resetTest: () =>
		set({
			questions: [],
			startTime: null,
			endTime: null,
		}),
}))
