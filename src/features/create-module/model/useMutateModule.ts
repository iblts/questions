'use client'

import { createModule } from '@/entities/module'
import { useAuth } from '@/features/auth'
import type { Card } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'

interface CreateModuleProps {
	module: {
		title: string
		description: string
	}
	cards: Partial<Card>[]
}

export const useMutateModule = () => {
	const userId = useAuth().data?.id

	return useMutation({
		mutationFn: (data: CreateModuleProps) =>
			createModule({
				module: { ...data.module, authorId: userId! },
				cards: data.cards,
			}),
	})
}
