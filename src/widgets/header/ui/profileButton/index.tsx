'use client'

import { signOut } from '@/features/auth'
import { QUERY_KEYS, ROUTES } from '@/shared/constants'
import { queryClient } from '@/shared/providers'
import { IconUser } from '@/shared/ui'
import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import styles from './styles.module.scss'

export default function ProfileButton() {
	const router = useRouter()

	const handleSignOut = async () => {
		await signOut()
		await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER] })
		router.push('/')
	}

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
				<button
					type='submit'
					className={classNames(styles.tool, styles.btn)}
					onClick={handleSignOut}
				>
					Выйти
				</button>
			</div>
		</div>
	)
}
