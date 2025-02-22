import { ModuleForm, ModuleFormProvider } from '@/features/module-form'
import styles from './page.module.scss'

export default async function Create() {
	return (
		<main className={styles.main}>
			<ModuleFormProvider>
				<ModuleForm action='create' />
			</ModuleFormProvider>
		</main>
	)
}
