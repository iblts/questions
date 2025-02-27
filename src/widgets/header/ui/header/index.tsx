import { ProfileButton } from '@/features/profile'
import { ROUTES } from '@/shared/constants'
import { Button } from '@/shared/ui'
import Link from 'next/link'
import SearchLine from '../searchLine'
import styles from './styles.module.scss'

export default async function Header() {
	return (
		<header className={styles.header}>
			<Link href={ROUTES.HOME} className={styles.logo}>
				<h2 className={styles.desctopLogo}>QUESTIONS</h2>
				<h2 className={styles.tabletLogo}>Q</h2>
			</Link>
			<SearchLine />
			<div className={styles.group}>
				<Button
					className={styles.createBtn}
					link={ROUTES.CREATE}
					title='Создать объявление'
				>
					<span className={styles.buttonText}>Создать модуль</span>
				</Button>
				<ProfileButton />
			</div>
		</header>
	)
}
