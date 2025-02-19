import { getModule } from '@/entities/module'
import { ROUTES } from '@/shared/constants'
import CardsViewer from '@/widgets/cards-viewer/ui/cardsViewer'
import type { Metadata } from 'next'
import Link from 'next/link'

export async function generateMetadata({
	params,
}: {
	params: Promise<{ id: string }>
}): Promise<Metadata> {
	const moduleProgress = await getModule((await params).id)

	return {
		title: `${moduleProgress.module.title} - Flashcards`,
		description: moduleProgress.module.description || 'Learn anything you want',
	}
}

export default async function FlashCards({
	params,
}: {
	params: Promise<{ id: string }>
}) {
	const { id } = await params
	const moduleProgress = await getModule(id)

	console.log(id, moduleProgress)

	return (
		<main>
			<h1>
				<Link href={`${ROUTES.MODULE}/${id}`}>
					{moduleProgress.module.title}
				</Link>
			</h1>
			<CardsViewer cards={moduleProgress.module.cards} />
		</main>
	)
}
