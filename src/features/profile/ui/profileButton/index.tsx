'use client'

import { signOut } from '@/features/auth'
import { QUERY_KEYS, ROUTES } from '@/shared/constants'
import { useModal } from '@/shared/hooks'
import { queryClient } from '@/shared/providers'
import { Button, IconClose, IconUser } from '@/shared/ui'
import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { HTMLAttributes } from 'react'
import styles from './styles.module.scss'

export default function ProfileButton({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	const router = useRouter()
	const { isOpen, openModal, closeModal } = useModal()

	const handleSignOut = async () => {
		await signOut()
		await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER] })
		router.push('/')
		closeModal()
	}

	return (
		<div className={classNames(styles.wrapper, className)} {...props}>
			{isOpen && (
				<Button className={styles.close} onClick={closeModal}>
					<IconClose size={20} />
				</Button>
			)}
			<div className={styles.body}>
				<Link href={ROUTES.PROFILE} className={styles.desctopUser}>
					<IconUser size={32} />
				</Link>
				<Button className={styles.mobileUser} onClick={openModal}>
					<IconUser size={32} />
				</Button>
			</div>
			<div className={classNames(styles.tools, { [styles.open]: isOpen })}>
				<Link
					href={ROUTES.PROFILE}
					className={styles.tool}
					onClick={closeModal}
				>
					Профиль
				</Link>
				<Link
					href={ROUTES.MY_MODULES}
					className={styles.tool}
					onClick={closeModal}
				>
					Модули
				</Link>
				<Link
					href={ROUTES.SETTINGS}
					className={styles.tool}
					onClick={closeModal}
				>
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
