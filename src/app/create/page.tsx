'use client'
import ImportModal from '@/components/modals/importModal'
import Input from '@/components/ui/input'
import Label from '@/components/ui/label'
import Image from 'next/image'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import styles from './page.module.scss'

export default function Create() {
	const [title, setTitle] = useState('')
	const [description, setDesctiption] = useState('')
	const [isModal, setModal] = useState(false)
	const [cards, setCards] = useState([
		{
			term: '',
			definition: '',
		},
		{
			term: '',
			definition: '',
		},
	])

	const handleAddCard = () => {
		cards.length < 50 &&
			setCards(prev => [...prev, { term: '', definition: '' }])
	}

	const handleDeleteCard = (index: number) => {
		cards.length > 1 && setCards(prev => prev.filter((_, i) => i !== index))
	}

	return (
		<main>
			{isModal &&
				createPortal(
					<ImportModal close={() => setModal(false)} setCards={setCards} />,
					document.body
				)}
			<Label className={styles.title}>
				<p>Название</p>
				<Input
					placeholder='Введите название модуля'
					value={title}
					onChange={e => setTitle(e.target.value)}
				/>
			</Label>
			<Label className={styles.description}>
				<p>Описание</p>
				<Input
					placeholder='Введите описание модуля'
					value={description}
					onChange={e => setDesctiption(e.target.value)}
				/>
			</Label>
			<button className={styles.import} onClick={() => setModal(true)}>
				Импортировать
			</button>
			<div className={styles.cards}>
				{cards.map((card, i) => (
					<div className={styles.card} key={i}>
						<Image
							src='/close.svg'
							alt='close'
							width={16}
							height={16}
							className={styles.close}
							onClick={() => handleDeleteCard(i)}
						/>
						<Label>
							<Input
								placeholder='Введите термин'
								value={card.term}
								onChange={e =>
									setCards([
										...cards.slice(0, i),
										{ definition: card.definition, term: e.target.value },
										...cards.slice(i + 1),
									])
								}
							/>
							<p>Термин</p>
						</Label>
						<Label>
							<Input
								placeholder='Введите определение'
								value={card.definition}
								onChange={e =>
									setCards([
										...cards.slice(0, i),
										{ term: card.term, definition: e.target.value },
										...cards.slice(i + 1),
									])
								}
							/>
							<p>Определение</p>
						</Label>
					</div>
				))}
			</div>
			<button className={styles.add} onClick={handleAddCard}>
				<Image src='/plus.svg' alt='plus' width={64} height={64} />
			</button>
			<button className={styles.create}>Создать</button>
		</main>
	)
}
