import { getModule } from '@/entities/module'
import { getModuleProgress } from '@/entities/moduleProgress'
import Learning from '@/features/learning/ui/learning'
import type { Metadata } from 'next'

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

export default async function Page({
	params,
}: {
	params: Promise<{ id: string }>
}) {
	const moduleProgress = await getModuleProgress((await params).id)

	return (
		<main>
			<Learning cardsProgress={moduleProgress.cardProgress} />
		</main>
	)
}
