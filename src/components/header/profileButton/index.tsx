import { getAuth, signOut } from '@/features'
import Image from 'next/image'
import Link from 'next/link'
import styles from './styles.module.scss'

export default async function ProfileButton() {
	const { user } = await getAuth()

	const profileLink = user ? `/profile/${user.id}` : '/auth/login'
	const modulesLink = user ? `${profileLink}/modules` : '/auth/login'

	return (
		<div className={styles.wrapper}>
			<div className={styles.body}>
				<Link href={profileLink}>
					<Image src='/user.svg' alt='User' width={32} height={32} />
				</Link>
			</div>
			<div className={styles.tools}>
				<Link href={profileLink} className={styles.tool}>
					Профиль
				</Link>
				<Link href={modulesLink} className={styles.tool}>
					Модули
				</Link>
				<Link href='/settings' className={styles.tool}>
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
