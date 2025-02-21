import { z } from 'zod'

export const moduleSchema = z.object({
	title: z.string().min(1, 'Название обязательно'),
	description: z.string().optional(),
	cards: z
		.array(
			z.object({
				id: z.number().optional(),
				termin: z.string().min(1, 'Термин обязателен'),
				definition: z.string().min(1, 'Определение обязательно'),
			})
		)
		.min(2, 'Требуется минимум две карточки'),
})

export type CreateFormType = z.infer<typeof moduleSchema>
