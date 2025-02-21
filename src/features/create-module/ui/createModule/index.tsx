'use client'

import { Button, ControlledInput, IconPlus } from '@/shared/ui'
import { useModal } from '@/shared/utils'
import { createPortal } from 'react-dom'
import { useCreateModule } from '../../model/hooks'
import CardInfoForm from '../cardInfoForm'
import ImportModal from '../importModal'
import styles from './styles.module.scss'

interface FormData {
	title: string
	description: string
}

export default function CreateModule() {
	const { isOpen, closeModal, openModal } = useModal()
	const {
		cards,
		handleRemoveCard,
		handleSetCards,
		handleSubmit,
		isPending,
		handleAddCard,
	} = useCreateModule()

	return (
		<main className={styles.main}>
			<form onSubmit={handleSubmit}>
				<div className={styles.info}>
					<ControlledInput<FormData>
						placeholder='Введите название модуля'
						name='title'
						label='Название'
					/>
					<ControlledInput<FormData>
						placeholder='Введите описание модуля'
						name='description'
						label='Описание'
					/>
				</div>
				{isOpen &&
					createPortal(
						<ImportModal close={closeModal} setCards={handleSetCards} />,
						document.body
					)}
				<Button className={styles.import} onClick={openModal} type='button'>
					Импортировать
				</Button>
				<div className={styles.cards}>
					{cards.map((card, i) => (
						<CardInfoForm
							i={i}
							key={card.id}
							onDelete={() => handleRemoveCard(i)}
						/>
					))}
				</div>
				<Button
					className={styles.add}
					onClick={handleAddCard}
					type='button'
					variant='secondary'
				>
					<IconPlus size={64} fill='#fff' />
				</Button>
				<Button className={styles.create} type='submit' disabled={isPending}>
					Создать
				</Button>
			</form>
		</main>
	)
}
