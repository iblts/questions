import { IconSearch } from '@/shared/ui'
import styles from './styles.module.scss'

export default function SearchLine() {
	return (
		<label className={styles.search}>
			<IconSearch size={20} />
			<input placeholder='Введите свой запрос' />
		</label>
	)
}
