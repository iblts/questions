import Label from '@/components/ui/label'
import Image from 'next/image'
import type { Dispatch, SetStateAction } from 'react'
import styles from './styles.module.scss'

interface Props {
	cards: { termin: string; definition: string }[]
	setCards: Dispatch<SetStateAction<{ termin: string; definition: string }[]>>
	i: number
	card: { termin: string; definition: string }
}

export default function CardInfo({ cards, setCards, i, card }: Props) {
	const handleDeleteCard = (index: number) => {
		if (cards.length > 2) {
			setCards(prev => prev.filter((_, i) => i !== index))
		}
	}

	return (
		<div className={styles.card}>
			<Image
				src='/close.svg'
				alt='close'
				width={16}
				height={16}
				className={styles.close}
				onClick={() => handleDeleteCard(i)}
			/>
			<Label>
				<input
					placeholder='Введите термин'
					value={card.termin}
					onChange={e =>
						setCards([
							...cards.slice(0, i),
							{ definition: card.definition, termin: e.target.value },
							...cards.slice(i + 1),
						])
					}
				/>
				<p>Термин</p>
			</Label>
			<Label>
				<input
					placeholder='Введите определение'
					value={card.definition}
					onChange={e =>
						setCards([
							...cards.slice(0, i),
							{ termin: card.termin, definition: e.target.value },
							...cards.slice(i + 1),
						])
					}
				/>
				<p>Определение</p>
			</Label>
		</div>
	)
}
