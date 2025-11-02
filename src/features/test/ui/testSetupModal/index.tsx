'use client'

import { Button, Checkbox, Input, Modal } from '@/shared/ui'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import styles from './testSetupModal.module.scss'

interface TestSetupModalProps {
	moduleId: string
	onClose: () => void
}

export const TestSetupModal = ({ moduleId, onClose }: TestSetupModalProps) => {
	const [types, setTypes] = useState({
		write: true,
		select: false,
		match: false,
	})
	const [count, setCount] = useState(10)
	const router = useRouter()

	const toggleType = (key: keyof typeof types) => {
		setTypes(prev => ({ ...prev, [key]: !prev[key] }))
	}

	const handleStart = () => {
		if (!Object.values(types).some(Boolean)) {
			alert('Выберите хотя бы один тип вопроса')
			return
		}

		if (count < 10) {
			alert('Минимум 10 вопросов')
			return
		}

		const selectedTypes = Object.entries(types)
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			.filter(([_, v]) => v)
			.map(([k]) => k) as ('write' | 'select' | 'match')[]

		router.push(
			`/module/${moduleId}/test?questions=${count}&type=${selectedTypes.join(
				';'
			)}`
		)

		onClose()
	}

	return (
		<Modal close={onClose}>
			<h3 className={styles.title}>Настройки теста</h3>

			<div className={styles.section}>
				<Checkbox
					label='Вписать'
					isActive={types.write}
					setActive={() => toggleType('write')}
				/>
				<Checkbox
					label='Выбрать'
					isActive={types.select}
					setActive={() => toggleType('select')}
				/>
				<Checkbox
					label='Совместить'
					isActive={types.match}
					setActive={() => toggleType('match')}
				/>
			</div>

			<div className={styles.section}>
				<label className={styles.label}>Количество вопросов:</label>
				<Input
					min={10}
					value={count}
					onChange={e => setCount(+e.target.value)}
					type='number'
				/>
			</div>

			<Button onClick={handleStart}>Продолжить</Button>
		</Modal>
	)
}
