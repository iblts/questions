import { getModules, ModulePreview } from '@/entities/module'
import { UserModulesList } from '@/features/user-modules'
import { Slider } from '@/shared/ui'
import styles from './page.module.scss'

export default async function Home() {
	const popularModules = await getModules()

	return (
		<main className={styles.main}>
			<h2 className={styles.title}>Ваши модули</h2>
			<UserModulesList />

			<h2 className={styles.title}>Рекомендованные модули</h2>
			<Slider className={styles.modules}>
				{popularModules?.map(module => (
					<ModulePreview module={module} key={module.id} />
				))}
			</Slider>
		</main>
	)
}
