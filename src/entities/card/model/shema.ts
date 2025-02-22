import { z } from 'zod'

export const cardSchema = z.object({
	id: z.string(),
	termin: z.string().min(1, 'Термин обязателен'),
	definition: z.string().min(1, 'Определение обязательно'),
})

export type CardFormType = z.infer<typeof cardSchema>
