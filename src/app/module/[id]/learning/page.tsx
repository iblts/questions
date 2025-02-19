import { getModule } from '@/entities/module'
import Learning from '@/features/learning/ui/learning'
import type { Metadata } from 'next'

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

export default async function Page({
	params,
}: {
	params: Promise<{ id: string }>
}) {
	const moduleProgress = await getModule((await params).id)

	return (
		<main>
			<Learning cardsProgress={moduleProgress.cardProgress} />
		</main>
	)
}
