import ModulePreview from '@/components/main/modulePreview'
import Slider from '@/components/slider'
import { getAuth } from '@/features/auth/getAuth'
import { getModules } from '@/features/module/getModules'
import { getUser } from '@/features/user/getUser'
import { ModuleWithRelations } from '@/types/module'
import { redirect } from 'next/navigation'
import styles from './page.module.css'

export default async function Home() {
	const { user } = await getAuth()

	if (!user) {
		redirect('/auth/login')
	}

	const currentUser = await getUser(user.id)
	const popularModules: ModuleWithRelations[] = await getModules()

	return (
		<main className={styles.main}>
			<h2 className={styles.title}>Ваши модули</h2>
			<Slider className={styles.modules}>
				{currentUser.modules.map(module => (
					<ModulePreview module={module} user={user.login} key={module.id} />
				))}
			</Slider>

			<h2 className={styles.title}>Рекомендованные модули</h2>
			<Slider className={styles.modules}>
				{popularModules.map(module => (
					<ModulePreview module={module} user={user.login} key={module.id} />
				))}
			</Slider>
		</main>
	)
}
