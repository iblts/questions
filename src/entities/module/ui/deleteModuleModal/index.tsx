'use client'

import { QUERY_KEYS } from '@/shared/constants'
import { queryClient } from '@/shared/providers'
import { Button, Modal } from '@/shared/ui'
import { useRouter } from 'next/navigation'
import { deleteModule } from '../../model/moduleApi'
import styles from './styles.module.scss'

export default function DeleteModuleModal({
	close,
	moduleId,
}: {
	close: () => void
	moduleId: string
}) {
	const router = useRouter()

	const handleDeleteModule = () => {
		deleteModule(moduleId)
		router.push('/')
		queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER] })
	}

	return (
		<Modal close={close}>
			<h2>Вы уверены, что хотите удалить модуль?</h2>
			<p>Отменить это действие будет невозможно</p>
			<div className={styles.buttons}>
				<Button
					background='#d02929'
					variant='secondary'
					onClick={handleDeleteModule}
				>
					Удалить
				</Button>
				<Button onClick={close}>Отменить</Button>
			</div>
		</Modal>
	)
}
