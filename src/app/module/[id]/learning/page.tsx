import { getCardProgressByModuleId } from '@/entities/cardProgress'
import { getModule } from '@/entities/module'
import { getModuleProgress } from '@/entities/moduleProgress'
import { generateLearningQuestions } from '@/features/learning/model/generateLearningQuestions'
import Learning from '@/features/learning/ui/learning'
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
		title: `${currentModule?.title} - Learning`,
		description: currentModule?.description || 'Learn anything you want',
	}
}

export default async function Page({
	params,
	searchParams,
}: {
	params: Promise<{ id: string }>
	searchParams?: Promise<{ mode?: string }>
}) {
	const id = (await params).id
	const [cardsProgress, moduleProgress] = await Promise.all([
		getCardProgressByModuleId(id),
		getModuleProgress(id),
	])
	const queryParametres = await searchParams
	const mode =
		queryParametres && queryParametres.mode
			? queryParametres.mode === '1' || queryParametres.mode === '2'
				? (+queryParametres.mode as 1 | 2)
				: undefined
			: undefined
	const questions = generateLearningQuestions(cardsProgress, mode)

	return (
		<main>
			<h1 className={styles.title}>
				<Link href={`${ROUTES.MODULE}/${id}`}>
					{moduleProgress.module.title}
				</Link>
			</h1>
			<Learning cardsProgress={cardsProgress} questions={questions} />
		</main>
	)
}
