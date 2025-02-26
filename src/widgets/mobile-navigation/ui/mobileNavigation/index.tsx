import { ROUTES } from '@/shared/constants'
import { Button, IconPlus } from '@/shared/ui'
import ProfileButton from '@/widgets/header/ui/profileButton'
import Link from 'next/link'
import styles from './styles.module.scss'

export default function MobileNavigation() {
	return (
		<nav className={styles.navigation}>
			<Link href={ROUTES.HOME} className={styles.link}>
				<span className={styles.logo}>Q</span>
			</Link>
			<Link href={ROUTES.CREATE} className={styles.link}>
				<Button className={styles.createButton}>
					<IconPlus size={44} />
				</Button>
			</Link>
			<ProfileButton className={styles.link} />
		</nav>
	)
}
