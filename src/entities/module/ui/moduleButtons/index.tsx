'use client'

import { useAuth } from '@/features/auth'
import { ROUTES } from '@/shared/constants'
import { useModal } from '@/shared/hooks'
import { Button, IconDelete, IconEdit } from '@/shared/ui'
import DeleteModuleModal from '../deleteModuleModal'
import styles from './styles.module.scss'

export default function ModuleButtons({
	moduleId,
	authorId,
}: {
	moduleId: string
	authorId?: string | null
}) {
	const { data: user, isLoading } = useAuth()
	const { isOpen, openModal, closeModal } = useModal()

	if (isLoading || user?.id !== authorId) return null

	return (
		<div className={styles.buttons}>
			<Button
				className={styles.button}
				variant='secondary'
				link={`${ROUTES.EDIT}/${moduleId}`}
			>
				<IconEdit />
			</Button>
			<Button className={styles.button} variant='secondary' onClick={openModal}>
				<IconDelete />
			</Button>
			{isOpen && <DeleteModuleModal close={closeModal} moduleId={moduleId} />}
		</div>
	)
}
