import { getModule, ModuleButtons } from '@/entities/module'
import { getModuleProgress } from '@/entities/moduleProgress'
import { SelectModeButton } from '@/features/learning/ui/selectModeButton'
import { TestSetupButton } from '@/features/test/ui/testSetupButton'
import { IconCards, IconMatch } from '@/shared/ui'
import { CardsViewer } from '@/widgets/cards-viewer'
import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import styles from './page.module.scss'

export async function generateMetadata({
	params,
}: {
	params: Promise<{ id: string }>
}): Promise<Metadata> {
	const currentModule = await getModule((await params).id)

	return {
		title: currentModule?.title || 'Учебный модуль',
		description: currentModule?.description || 'Learn anything you want',
	}
}

export default async function ModulePage({
	params,
}: {
	params: Promise<{ id: string }>
}) {
	const { id } = await params
	const moduleProgress = await getModuleProgress(id)

	if (!moduleProgress) redirect(`/module/${id}`)

	return (
		<main className={styles.main}>
			<div className={styles.header}>
				<h1 className={styles.title}>{moduleProgress.module.title}</h1>
				<ModuleButtons
					moduleId={id}
					authorId={moduleProgress.module.authorId}
				/>
			</div>
			<section>
				<div className={styles.actions}>
					<Link href={`/module/${id}/flashcards`} className={styles.action}>
						<IconCards size={24} />
						Карточки
					</Link>

					<SelectModeButton id={id} />

					{moduleProgress.module.cards.length > 9 && (
						<TestSetupButton id={id} />
					)}

					<Link href={`/module/${id}/match`} className={styles.action}>
						<IconMatch size={24} />
						Подбор
					</Link>
				</div>
				<CardsViewer module={moduleProgress.module} />
			</section>
		</main>
	)
}
