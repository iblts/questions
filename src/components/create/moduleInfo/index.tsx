import Label from '@/components/ui/label'
import type { Dispatch, SetStateAction } from 'react'
import styles from './styles.module.scss'

interface Props {
	title: string
	setTitle: Dispatch<SetStateAction<string>>
	description: string
	setDesctiption: Dispatch<SetStateAction<string>>
}

export default function ModuleInfo({
	title,
	setTitle,
	description,
	setDesctiption,
}: Props) {
	return (
		<div className={styles.info}>
			<Label className={styles.title}>
				<p>Название</p>
				<input
					placeholder='Введите название модуля'
					value={title}
					onChange={e => setTitle(e.target.value)}
				/>
			</Label>
			<Label className={styles.description}>
				<p>Описание</p>
				<input
					placeholder='Введите описание модуля'
					value={description}
					onChange={e => setDesctiption(e.target.value)}
				/>
			</Label>
		</div>
	)
}
