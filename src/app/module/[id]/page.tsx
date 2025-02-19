import { getModule } from '@/entities/module'
import { IconLearning, IconMatch, IconTest } from '@/shared/ui'
import IconCards from '@/shared/ui/icons/Cards'
import CardsViewer from '@/widgets/cards-viewer/ui/cardsViewer'
import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import styles from './page.module.scss'

export async function generateMetadata({
	params,
}: {
	params: Promise<{ id: string }>
}): Promise<Metadata> {
	const moduleProgress = await getModule((await params).id)

	return {
		title: moduleProgress.module.title,
		description: moduleProgress.module.description || 'Learn anything you want',
	}
}

export default async function ModulePage({
	params,
}: {
	params: Promise<{ id: string }>
}) {
	const { id } = await params
	const moduleProgress = await getModule(id)

	if (!moduleProgress) redirect(`/module/${id}`)

	return (
		<main>
			<h1 className={styles.title}>{moduleProgress.module.title}</h1>
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
