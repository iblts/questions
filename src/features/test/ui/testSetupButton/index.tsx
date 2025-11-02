'use client'

import { useModal } from '@/shared/hooks'
import { Button, IconLearning } from '@/shared/ui'
import { TestSetupModal } from '../testSetupModal'
import styles from './testSetupButton.module.scss'

export const TestSetupButton = ({
	id,
	customText,
}: {
	id: string
	customText?: string
}) => {
	const { isOpen, openModal, closeModal } = useModal()

	return (
		<>
			<Button className={styles.action} onClick={openModal}>
				<IconLearning size={24} />
				{customText ?? 'Тест'}
			</Button>
			{isOpen && <TestSetupModal moduleId={id} onClose={closeModal} />}
		</>
	)
}
