'use client'
import CardInfo from '@/components/create/cardInfo'
import ModuleInfo from '@/components/create/moduleInfo'
import ImportModal from '@/components/modals/importModal'
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

	return (
		<main>
			{isModal &&
				createPortal(
					<ImportModal close={() => setModal(false)} setCards={setCards} />,
					document.body
				)}
			<ModuleInfo
				title={title}
				setTitle={setTitle}
				description={description}
				setDesctiption={setDesctiption}
			/>
			<button className={styles.import} onClick={() => setModal(true)}>
				Импортировать
			</button>
			<div className={styles.cards}>
				{cards.map((card, i) => (
					<CardInfo cards={cards} setCards={setCards} i={i} card={card} />
				))}
			</div>
			<button className={styles.add} onClick={handleAddCard}>
				<Image src='/plus.svg' alt='plus' width={64} height={64} />
			</button>
			<button className={styles.create}>Создать</button>
		</main>
	)
}
