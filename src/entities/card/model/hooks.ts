import { useMutation } from '@tanstack/react-query'
import { useFormContext } from 'react-hook-form'
import { updateCard } from './cardApi'
import { CardFormType } from './shema'

export const useMutateCard = (close: () => void) => {
	const { handleSubmit } = useFormContext<CardFormType>()
	const updateCard = useUpdateCard()

	const onSubmit = async (data: CardFormType) => {
		await updateCard.mutateAsync(data)
		close()
	}

	return { handleSubmit: handleSubmit(onSubmit) }
}

const useUpdateCard = () => {
	return useMutation({
		mutationFn: (data: CardFormType) => updateCard(data.id, data),
	})
}
