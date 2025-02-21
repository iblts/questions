'use client'

import { CreateCard } from '@/shared/types'
import { Button, Select } from '@/shared/ui'
import { useState } from 'react'
import { useImportCards } from '../../model/hooks'
import styles from './styles.module.scss'

const dividersOptions = [
	{ value: '\t', label: 'Таб' },
	{ value: ' ', label: 'Пробел' },
	{ value: '-', label: 'Дефис' },
]

export default function ImportModal({
	close,
	setCards,
}: {
	close: () => void
	setCards: (cards: CreateCard[]) => void
}) {
	const [divider, setDivider] = useState(dividersOptions[0])
	const { text, setText, handleImport } = useImportCards(setCards, close)

	return (
		<div className={styles.overlay} onClick={close}>
			<div
				className={styles.modal}
				onClick={e => {
					e.preventDefault()
					e.stopPropagation()
				}}
			>
				<h2>Импорт вопросов</h2>
				<p>Вставьте пары термин-определение в поле ниже</p>
				<Select
					options={dividersOptions}
					label='Разделитель'
					onSelectOption={setDivider}
				/>
				<form>
					<textarea
						className={styles.textarea}
						placeholder='Введите пары термин-определение'
						value={text}
						onChange={e => setText(e.target.value)}
					/>
					<Button onClick={() => handleImport(divider.value)}>
						Импортировать
					</Button>
				</form>
			</div>
		</div>
	)
}
