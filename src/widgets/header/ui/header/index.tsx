import { ROUTES } from '@/shared/constants'
import { Button } from '@/shared/ui'
import Link from 'next/link'
import ProfileButton from '../profileButton'
import SearchLine from '../searchLine'
import styles from './styles.module.scss'

export default async function Header() {
	return (
		<header className={styles.header}>
			<Link href={ROUTES.HOME}>
				<h2 className={styles.logo}>QUESTIONS</h2>
			</Link>
			<SearchLine />
			<div className={styles.group}>
				<Link href={ROUTES.CREATE}>
					<Button className={styles.createBtn}>Создать модуль</Button>
				</Link>
				<ProfileButton />
			</div>
		</header>
	)
}
