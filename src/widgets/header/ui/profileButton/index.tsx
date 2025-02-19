import { signOut } from '@/features/auth'
import { ROUTES } from '@/shared/constants'
import { IconUser } from '@/shared/ui'
import Link from 'next/link'
import styles from './styles.module.scss'

export default async function ProfileButton() {
	return (
		<div className={styles.wrapper}>
			<div className={styles.body}>
				<Link href={ROUTES.PROFILE}>
					<IconUser size={32} />
				</Link>
			</div>
			<div className={styles.tools}>
				<Link href={ROUTES.PROFILE} className={styles.tool}>
					Профиль
				</Link>
				<Link href={ROUTES.MY_MODULES} className={styles.tool}>
					Модули
				</Link>
				<Link href={ROUTES.SETTINGS} className={styles.tool}>
					Настройки
				</Link>
				<form action={signOut} className={styles.tool}>
					<button type='submit' className={styles.btn}>
						Выйти
					</button>
				</form>
			</div>
		</div>
	)
}
