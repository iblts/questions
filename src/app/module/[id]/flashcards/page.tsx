import { getModule } from '@/entities/module'
import { getModuleProgress } from '@/entities/moduleProgress'
import { ROUTES } from '@/shared/constants'
import { CardsViewer } from '@/widgets/cards-viewer'
import type { Metadata } from 'next'
import Link from 'next/link'
import styles from './page.module.scss'

export async function generateMetadata({
	params,
}: {
	params: Promise<{ id: string }>
}): Promise<Metadata> {
	const currentModule = await getModule((await params).id)

	return {
		title: `${currentModule?.title} - Flashcards`,
		description: currentModule?.description || 'Learn anything you want',
	}
}

export default async function FlashCards({
	params,
}: {
	params: Promise<{ id: string }>
}) {
	const { id } = await params
	const moduleProgress = await getModuleProgress(id)

	return (
		<main>
			<h1 className={styles.title}>
				<Link href={`${ROUTES.MODULE}/${id}`}>
					{moduleProgress.module.title}
				</Link>
			</h1>
			<CardsViewer module={moduleProgress.module} />
		</main>
	)
}
