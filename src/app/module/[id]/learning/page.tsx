import { getCardProgressByModuleId } from '@/entities/cardProgress'
import { getModule } from '@/entities/module'
import Learning from '@/features/learning/ui/learning'
import type { Metadata } from 'next'

export async function generateMetadata({
	params,
}: {
	params: Promise<{ id: string }>
}): Promise<Metadata> {
	const currentModule = await getModule((await params).id)

	return {
		title: `${currentModule?.title} - Learning`,
		description: currentModule?.description || 'Learn anything you want',
	}
}

export default async function Page({
	params,
}: {
	params: Promise<{ id: string }>
}) {
	const cardsProgress = await getCardProgressByModuleId((await params).id)

	return (
		<main>
			<Learning cardsProgress={cardsProgress} />
		</main>
	)
}
