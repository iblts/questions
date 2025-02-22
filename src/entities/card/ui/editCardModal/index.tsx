'use client'

import { Button, ControlledInput, Modal } from '@/shared/ui'
import { useMutateCard } from '../../model/hooks'
import { CardFormType } from '../../model/shema'
import styles from './styles.module.scss'

export default function EditCardModal({ close }: { close: () => void }) {
	const { handleSubmit } = useMutateCard(close)

	return (
		<Modal close={close}>
			<h2 className={styles.title}>Редактировать карточку</h2>
			<form onSubmit={handleSubmit} className={styles.form}>
				<ControlledInput<CardFormType>
					name='termin'
					label='Термин'
					variant='secondary'
				/>
				<ControlledInput<CardFormType>
					name='definition'
					label='Определение'
					variant='secondary'
				/>
				<div className={styles.buttons}>
					<Button onClick={handleSubmit} type='submit'>
						Сохранить
					</Button>
					<Button variant='secondary' type='button' onClick={close}>
						Отменить
					</Button>
				</div>
			</form>
		</Modal>
	)
}
