import { getModule, ModuleButtons } from '@/entities/module'
import { getModuleProgress } from '@/entities/moduleProgress'
import { IconCards, IconLearning, IconMatch, IconTest } from '@/shared/ui'
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
			<div className={styles.actions}>
				<Link href={`/module/${id}/flashcards`} className={styles.action}>
					<IconCards size={24} />
					Карточки
				</Link>

				<Link href={`/module/${id}/learning`} className={styles.action}>
					<IconLearning size={24} />
					Заучивание
				</Link>

				<Link href={`/module/${id}/test`} className={styles.action}>
					<IconTest size={24} />
					Тест
				</Link>

				<Link href={`/module/${id}/match`} className={styles.action}>
					<IconMatch size={24} />
					Подбор
				</Link>
			</div>
			<CardsViewer cards={moduleProgress.module.cards} />
		</main>
	)
}
