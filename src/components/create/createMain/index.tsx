'use client'

import ImportModal from '@/components/modals/importModal'
import Button from '@/components/ui/button'
import { createModule } from '@/features/module/createModule'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import CardInfo from '../cardInfo'
import ModuleInfo from '../moduleInfo'
import styles from './styles.module.scss'

export default function CreateMain({ userId }: { userId: string }) {
	const [title, setTitle] = useState('')
	const [description, setDesctiption] = useState('')
	const [isModal, setModal] = useState(false)
	const [cards, setCards] = useState([
		{
			termin: '',
			definition: '',
		},
		{
			termin: '',
			definition: '',
		},
	])

	const handleAddCard = () => {
		if (cards.length < 50) {
			setCards(prev => [...prev, { termin: '', definition: '' }])
		}
	}

	const router = useRouter()

	const handleCreateModule = async () => {
		const createdModule = await createModule({
			module: {
				title,
				description,
				authorId: userId,
			},
			cards,
		})

		if (createdModule) router.replace(`/module/${createdModule.id}`)
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
			<Button className={styles.import} onClick={() => setModal(true)}>
				Импортировать
			</Button>
			<div className={styles.cards}>
				{cards.map((card, i) => (
					<CardInfo
						cards={cards}
						setCards={setCards}
						i={i}
						card={card}
						key={card.termin + card.definition + i}
					/>
				))}
			</div>
			<Button className={styles.add} onClick={handleAddCard}>
				<Image src='/plus.svg' alt='plus' width={64} height={64} />
			</Button>
			<Button className={styles.create} onClick={handleCreateModule}>
				Создать
			</Button>
		</main>
	)
}
