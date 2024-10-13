import CardsViewer from '@/components/cardsViewer'
import { getModule } from '@/features'
import type { Metadata } from 'next'
import Link from 'next/link'

export async function generateMetadata({
	params,
}: {
	params: { id: string }
}): Promise<Metadata> {
	const moduleProgress = await getModule(params.id)

	return {
		title: `${moduleProgress.module.title} - Flashcards`,
		description: moduleProgress.module.description || 'Learn anything you want',
	}
}

export default async function FlashCards({
	params,
}: {
	params: { id: string }
}) {
	const { id } = params
	const moduleProgress = await getModule(id)

	return (
		<main>
			<h1>
				<Link href={`/module/${id}`}>{moduleProgress.module.title}</Link>
			</h1>
			<CardsViewer cards={moduleProgress.cardProgress} />
		</main>
	)
}
