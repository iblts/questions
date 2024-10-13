import Link from 'next/link'
import { Button, ProfileButton, SearchLine } from '..'
import styles from './styles.module.scss'

export default async function Header() {
	return (
		<header className={styles.header}>
			<Link href='/'>
				<h2 className={styles.logo}>QUESTIONS</h2>
			</Link>
			<SearchLine />
			<div className={styles.group}>
				<Link href='/create'>
					<Button className={styles.createBtn}>Создать модуль</Button>
				</Link>
				<ProfileButton />
			</div>
		</header>
	)
}
