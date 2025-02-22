'use client'

import { createModule, updateModule } from '@/entities/module'
import { useAuth } from '@/features/auth'
import { QUERY_KEYS, ROUTES } from '@/shared/constants'
import { queryClient } from '@/shared/providers'
import type { CreateCard } from '@/shared/types'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { ModuleFormType } from './shema'

interface CreateProps {
	action: 'create'
}

interface UpdateProps {
	action: 'edit'
	id: string
}

export type MutateModuleProps = CreateProps | UpdateProps

export const useMutateModule = (props: MutateModuleProps) => {
	const { handleSubmit, control } = useFormContext<ModuleFormType>()
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
		cards: Pick<ModuleFormType, 'cards'>[keyof Pick<ModuleFormType, 'cards'>]
	) => {
		replace(cards)
	}

	const router = useRouter()
	const createModule = useCreateModule()
	const updateModule = useUpdateModule()

	const handleCreateModule = async (formData: ModuleFormType) => {
		if (props.action === 'create') {
			await createModule
				.mutateAsync(formData)
				.then(() =>
					queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER] })
				)
				.then(() => {
					router.push('/')
				})
		} else {
			await updateModule
				.mutateAsync({ id: props.id, ...formData })
				.then(() =>
					queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER] })
				)
				.then(() => {
					router.push(`${ROUTES.MODULE}/${props.id}`)
				})
		}
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

const useCreateModule = () => {
	const userId = useAuth().data?.id

	return useMutation({
		mutationFn: (data: ModuleFormType) =>
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

interface UpdateModule extends ModuleFormType {
	id: string
}

const useUpdateModule = () => {
	const userId = useAuth().data?.id

	return useMutation({
		mutationFn: (data: UpdateModule) =>
			updateModule(data.id, {
				module: {
					title: data.title,
					description: data.description,
					authorId: userId!,
				},
				cards: data.cards,
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
		const cardsData = rows
			.map((row, i) => {
				const [termin, definition] = row.split(divider)
				if (!termin || !definition) return
				return {
					id: `${i}`,
					termin: termin.trim(),
					definition: definition.trim(),
				}
			})
			.filter(card => !!card)
		setCards(cardsData)
		close()
	}

	return { text, setText, handleImport }
}
