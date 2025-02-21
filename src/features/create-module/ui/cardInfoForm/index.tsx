import { Input, Label } from '@/shared/ui'
import IconClose from '@/shared/ui/icons/Close'
import { type Dispatch, type SetStateAction } from 'react'
import styles from './styles.module.scss'

interface CardInput {
	id: number
	termin: string
	definition: string
}

interface Props {
	cards: CardInput[]
	setCards: Dispatch<SetStateAction<CardInput[]>>
	i: number
	card: CardInput
}

export default function CardInfoFrom({ cards, setCards, i, card }: Props) {
	const handleDeleteCard = (index: number) => {
		if (cards.length > 2) {
			setCards(prev => prev.filter((_, i) => i !== index))
		}
	}

	return (
		<div className={styles.card}>
			<IconClose
				size={16}
				className={styles.close}
				onClick={() => handleDeleteCard(i)}
			/>
			<Label>
				<Input
					placeholder='Введите термин'
					value={card.termin}
					onChange={e =>
						setCards([
							...cards.slice(0, i),
							{
								id: card.id,
								definition: card.definition,
								termin: e.target.value,
							},
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
							{ id: card.id, termin: card.termin, definition: e.target.value },
							...cards.slice(i + 1),
						])
					}
				/>
				<p>Определение</p>
			</Label>
		</div>
	)
}
