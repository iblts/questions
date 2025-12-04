'use client'

import { useModal } from '@/shared/hooks'
import { Button, IconLearning } from '@/shared/ui'
import { SelectModePopup } from '../selectModePopup'
import styles from './selectModeButton.module.scss'

export const SelectModeButton = ({ id }: { id: string }) => {
	const { isOpen, openModal, closeModal } = useModal()

	return (
		<>
			<Button className={styles.action} onClick={openModal}>
				<IconLearning size={24} />
				Заучивание
			</Button>
			{isOpen && <SelectModePopup id={id} onClose={closeModal} />}
		</>
	)
}
