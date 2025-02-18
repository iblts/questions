'use client'

import { Button, ControlledInput, IconPlus } from '@/shared/ui'
import { useModal } from '@/shared/utils'
import { createPortal } from 'react-dom'
import { useCreateModule } from '../../model/useCreateModule'
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
		setCards,
		handleSubmit,
		isPending,
		handleCreateModule,
		handleAddCard,
	} = useCreateModule()

	return (
		<main>
			<form
				onSubmit={e => {
					e.preventDefault()
					console.log('submitting')
					handleSubmit(handleCreateModule)
				}}
			>
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
			</form>
			{isOpen &&
				createPortal(
					<ImportModal close={closeModal} setCards={setCards} />,
					document.body
				)}
			<Button className={styles.import} onClick={openModal} type='button'>
				Импортировать
			</Button>
			<div className={styles.cards}>
				{cards.map((card, i) => (
					<CardInfoForm
						cards={cards}
						setCards={setCards}
						i={i}
						card={card}
						key={card.id}
					/>
				))}
			</div>
			<Button
				className={styles.add}
				onClick={handleAddCard}
				type='button'
				variant='secondary'
			>
				<IconPlus size={64} />
			</Button>
			<Button
				className={styles.create}
				type='submit'
				onClick={handleSubmit(handleCreateModule)}
				disabled={isPending}
			>
				Создать
			</Button>
		</main>
	)
}
