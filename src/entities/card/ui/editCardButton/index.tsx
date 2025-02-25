import { useAuth } from '@/features/auth'
import { useModal } from '@/shared/hooks'
import { IconEdit } from '@/shared/ui'
import type { Card } from '@prisma/client'
import { createPortal } from 'react-dom'
import CardFormProvider from '../../providers/ModuleFormProvider'
import EditCardModal from '../editCardModal'
import styles from './styles.module.scss'

export default function EditCardButton({
	card,
	authorId,
}: {
	card: Card
	authorId?: string | null
}) {
	const { isOpen, openModal, closeModal } = useModal()
	const { data: user, isLoading } = useAuth()

	if (isLoading || user?.id !== authorId) return null

	return (
		<>
			<button
				className={styles.button}
				onClick={e => {
					e.stopPropagation()
					openModal()
				}}
			>
				<IconEdit />
			</button>
			{isOpen &&
				createPortal(
					<CardFormProvider
						defaultValues={{
							termin: card.termin,
							definition: card.definition,
							id: card.id,
						}}
					>
						<EditCardModal close={closeModal} />
					</CardFormProvider>,
					document.body
				)}
		</>
	)
}
