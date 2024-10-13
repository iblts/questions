import Image from 'next/image'
import styles from './styles.module.scss'

export default function SearchLine() {
	return (
		<label className={styles.search}>
			<Image src='/search.svg' alt='Search' width={24} height={24} />
			<input placeholder='Введите свой запрос' />
		</label>
	)
}
