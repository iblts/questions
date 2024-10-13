import CardsViewer from '@/components/cardsViewer'
import { getModule } from '@/features'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.scss'

export async function generateMetadata({
	params,
}: {
	params: { id: string }
}): Promise<Metadata> {
	const moduleProgress = await getModule(params.id)

	return {
		title: moduleProgress.module.title,
		description: moduleProgress.module.description || 'Learn anything you want',
	}
}

export default async function ModulePage({
	params,
}: {
	params: { id: string }
}) {
	const { id } = params
	const moduleProgress = await getModule(id)

	return (
		<main>
			<h1 className={styles.title}>{moduleProgress.module.title}</h1>
			<div className={styles.actions}>
				<Link href={`/module/${id}/flashcards`} className={styles.action}>
					<Image src='/cards.svg' alt='cards' width={24} height={24} />
					Карточки
				</Link>

				<Link href={`/module/${id}/learning`} className={styles.action}>
					<Image src='/learning.svg' alt='learning' width={24} height={24} />
					Заучивание
				</Link>

				<Link href={`/module/${id}/test`} className={styles.action}>
					<Image src='/test.svg' alt='test' width={24} height={24} />
					Тест
				</Link>

				<Link href={`/module/${id}/match`} className={styles.action}>
					<Image src='/match.svg' alt='match' width={24} height={24} />
					Подбор
				</Link>
			</div>
			<CardsViewer cards={moduleProgress.cardProgress} />
		</main>
	)
}
