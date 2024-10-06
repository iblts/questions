import { signOut } from '@/features/auth/signOut'
import Link from 'next/link'
import styles from './styles.module.scss'

export default async function Header() {
	return (
		<header className={styles.header}>
			<Link href='/'>
				<h2>QUESTIONS</h2>
			</Link>
			<nav>
				<form action={signOut}>
					<button type='submit'>Выйти</button>
				</form>
			</nav>
		</header>
	)
}
