'use client'

import { createModule } from '@/entities/module'
import { useAuth } from '@/features/auth'
import type { CreateCard } from '@/shared/types'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { CreateFormType } from './shema'

export const useCreateModule = () => {
	const { handleSubmit, control } = useFormContext<CreateFormType>()
	const { fields, append, remove, replace } = useFieldArray({
		control,
		name: 'cards',
	})

	const handleAddCard = () => {
		if (fields.length < 50) {
			append({
				id: fields[fields.length - 1].id + 1,
				termin: '',
				definition: '',
			})
		}
	}

	const handleRemoveCard = (index: number) => {
		if (fields.length > 2) remove(index)
	}

	const handleSetCards = (
		cards: Pick<CreateFormType, 'cards'>[keyof Pick<CreateFormType, 'cards'>]
	) => {
		replace(cards)
	}

	const router = useRouter()
	const createModule = useMutateModule()

	const handleCreateModule = async (formData: CreateFormType) => {
		await createModule.mutateAsync(formData).then(() => {
			router.push(`/`)
		})
	}

	return {
		isPending: createModule.isPending,
		cards: fields,
		handleSetCards,
		handleSubmit: handleSubmit(handleCreateModule),
		handleAddCard,
		handleRemoveCard,
	}
}

export const useMutateModule = () => {
	const userId = useAuth().data?.id

	return useMutation({
		mutationFn: (data: CreateFormType) =>
			createModule({
				module: {
					title: data.title,
					description: data.description,
					authorId: userId!,
				},
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				cards: data.cards.map(({ id, ...card }) => card),
			}),
	})
}

export const useImportCards = (
	setCards: (cards: CreateCard[]) => void,
	close: () => void
) => {
	const [text, setText] = useState('')

	const handleImport = (divider: string = '\t') => {
		const rows = text.split('\n')
		const cardsData = rows.map((row, i) => {
			const [termin, definition] = row.split(divider)
			if (!termin || !definition) return { id: i, termin: '', definition: '' }
			return { id: i, termin: termin.trim(), definition: definition.trim() }
		})
		setCards(cardsData)
		close()
	}

	return { text, setText, handleImport }
}
