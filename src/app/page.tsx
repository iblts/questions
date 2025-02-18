import { getModules, ModulePreview } from '@/entities/module'
import { ModuleWithRelations } from '@/shared/types'
import Slider from '@/shared/ui/slider'
import styles from './page.module.css'

export default async function Home() {
	const popularModules: ModuleWithRelations[] = await getModules()

	return (
		<main className={styles.main}>
			<h2 className={styles.title}>Ваши модули</h2>
			{/* <Slider className={styles.modules}>
				{currentUser.modules.map(module => (
					<ModulePreview module={module} user={currentUser} key={module.id} />
				))}
			</Slider> */}

			<h2 className={styles.title}>Рекомендованные модули</h2>
			<Slider className={styles.modules}>
				{popularModules.map(module => (
					<ModulePreview module={module} key={module.id} />
				))}
			</Slider>
		</main>
	)
}
