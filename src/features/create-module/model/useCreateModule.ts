import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useMutateModule } from './useMutateModule'

interface FormData {
	title: string
	description: string
}

export const useCreateModule = () => {
	const { handleSubmit } = useFormContext<FormData>()
	const [cards, setCards] = useState([
		{
			id: 0,
			termin: '',
			definition: '',
		},
		{
			id: 1,
			termin: '',
			definition: '',
		},
	])

	const handleAddCard = () => {
		if (cards.length < 50) {
			setCards(prev => [
				...prev,
				{ id: prev[prev.length - 1].id + 1, termin: '', definition: '' },
			])
		}
	}

	const router = useRouter()
	const createModule = useMutateModule()

	const handleCreateModule = async (formData: FormData) => {
		await createModule
			.mutateAsync({
				module: formData,
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				cards: cards.map(({ id, ...card }) => card),
			})
			.then(() => {
				router.push(`/`)
			})
	}

	return {
		isPending: createModule.isPending,
		cards,
		setCards,
		handleSubmit,
		handleAddCard,
		handleCreateModule,
	}
}
