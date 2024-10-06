import { getAuth } from '@/features/auth/getAuth'
import { redirect } from 'next/navigation'
import styles from './page.module.css'

export default async function Home() {
	const { user } = await getAuth()

	if (!user) {
		redirect('/auth/login')
	}

	return (
		<main className={styles.main}>
			<h1>HELLO</h1>
		</main>
	)
}
