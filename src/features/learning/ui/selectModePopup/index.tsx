'use client'

import { Button, Modal } from '@/shared/ui'
import RadioButton from '@/shared/ui/radio'
import { useState } from 'react'
import styles from './selectModePopup.module.scss'

export const SelectModePopup = ({
	id,
	onClose,
}: {
	id: string
	onClose: () => void
}) => {
	const [mode, setMode] = useState<1 | 2>(1)
	const link = `/module/${id}/learning?mode=${mode}`

	return (
		<Modal close={onClose}>
			<h3 className={styles.title}>Выберите режим</h3>
			<RadioButton
				label='Термин'
				isActive={mode === 1}
				setActive={() => setMode(1)}
			/>
			<RadioButton
				label='Определение'
				isActive={mode === 2}
				setActive={() => setMode(2)}
			/>
			<Button link={link}>Продолжить</Button>
		</Modal>
	)
}
