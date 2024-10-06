'use client'

import Button from '@/components/ui/button'
import { useState, type Dispatch, type SetStateAction } from 'react'
import styles from './styles.module.scss'

export default function ImportModal({
	close,
	setCards,
}: {
	close: () => void
	setCards: Dispatch<SetStateAction<{ termin: string; definition: string }[]>>
}) {
	const [text, setText] = useState('')

	const handleImport = () => {
		const rows = text.split('\n')
		const cardsData = rows.map(row => {
			const [termin, definition] = row.split('\t')
			if (!termin || !definition) return { termin: '', definition: '' }
			return { termin: termin.trim(), definition: definition.trim() }
		})
		setCards(cardsData)
		close()
	}

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
				<form>
					<textarea
						className={styles.textarea}
						placeholder='Введите пары термин-определение'
						value={text}
						onChange={e => setText(e.target.value)}
					/>
					<Button onClick={handleImport}>Import</Button>
				</form>
			</div>
		</div>
	)
}
