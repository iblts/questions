import { getModule } from '@/entities/module'
import { getModuleProgress } from '@/entities/moduleProgress'
import { generateMatchCards } from '@/features/match/model/generateMatchCards'
import { MatchCardsList } from '@/features/match/ui/list'
import { ROUTES } from '@/shared/constants'
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
		title: `${currentModule?.title} - Match`,
		description: currentModule?.description || 'Learn anything you want',
	}
}

export default async function MatchPage({
	params,
}: {
	params: Promise<{ id: string }>
}) {
	const id = (await params).id
	const moduleProgress = await getModuleProgress(id)
	const matchCards = generateMatchCards(moduleProgress.module.cards)

	return (
		<main>
			<h1 className={styles.title}>
				<Link href={`${ROUTES.MODULE}/${id}`}>
					{moduleProgress.module.title}
				</Link>
			</h1>
			<MatchCardsList
				cards={matchCards}
				allCards={moduleProgress.module.cards}
			/>
		</main>
	)
}
