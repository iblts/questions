import { getModule } from '@/entities/module'
import { ModuleForm, ModuleFormProvider } from '@/features/module-form'
import styles from './page.module.scss'

export default async function Edit({
	params,
}: {
	params: Promise<{ moduleId: string }>
}) {
	const { moduleId } = await params
	const initialModule = await getModule(moduleId)

	return (
		<main className={styles.main}>
			<ModuleFormProvider
				defaultValues={{
					title: initialModule?.title || '',
					description: initialModule?.description || '',

					cards: initialModule?.cards || [],
				}}
			>
				<ModuleForm action='edit' id={moduleId} />
			</ModuleFormProvider>
		</main>
	)
}
