'use client'

import {
	Button,
	ControlledCheckbox,
	ControlledInput,
	IconPlus,
} from '@/shared/ui'
import { useModal } from '@/shared/utils'
import { createPortal } from 'react-dom'
import { type MutateModuleProps, useMutateModule } from '../../model/hooks'
import { ModuleFormType } from '../../model/shema'
import CardInfoForm from '../cardInfoForm'
import ImportModal from '../importModal'
import styles from './styles.module.scss'

export default function ModuleForm(props: MutateModuleProps) {
	const { isOpen, closeModal, openModal } = useModal()
	const {
		cards,
		handleRemoveCard,
		handleSetCards,
		handleSubmit,
		isPending,
		handleAddCard,
	} = useMutateModule(props)

	return (
		<form onSubmit={handleSubmit}>
			<div className={styles.info}>
				<ControlledInput<ModuleFormType>
					placeholder='Введите название модуля'
					name='title'
					label='Название'
				/>
				<ControlledInput<ModuleFormType>
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
			<div className={styles.options}>
				<Button className={styles.import} onClick={openModal} type='button'>
					Импортировать
				</Button>
				<ControlledCheckbox name='private' label='Приватный' />
			</div>

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
				{props.action === 'create' ? 'Создать' : 'Сохранить изменения'}
			</Button>
		</form>
	)
}
