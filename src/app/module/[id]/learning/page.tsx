import { Learning } from '@/components'
import { getModule } from '@/features'
import type { Metadata } from 'next'

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

export default async function Page({ params }: { params: { id: string } }) {
	const moduleProgress = await getModule(params.id)

	return (
		<main>
			<Learning cardsProgress={moduleProgress.cardProgress} />
		</main>
	)
}
