import { ControlledInput } from '@/shared/ui'
import IconClose from '@/shared/ui/icons/Close'
import { CreateFormType } from '../../model/shema'
import styles from './styles.module.scss'

interface Props {
	i: number
	onDelete: () => void
}

export default function CardInfoFrom({ i, onDelete }: Props) {
	return (
		<div className={styles.card}>
			<IconClose size={16} className={styles.close} onClick={onDelete} />
			<ControlledInput<CreateFormType>
				placeholder='Введите термин'
				name={`cards.${i}.termin`}
				label='Термин'
				labelBelow
			/>
			<ControlledInput<CreateFormType>
				placeholder='Введите определение'
				name={`cards.${i}.definition`}
				label='Определение'
				labelBelow
			/>
		</div>
	)
}
