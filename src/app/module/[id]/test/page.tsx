import { getCardProgressByModuleId } from '@/entities/cardProgress'
import { getModule } from '@/entities/module'
import { getModuleProgress } from '@/entities/moduleProgress'
import { generateTestQuestions, TestQuestions } from '@/features/test'
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
		title: `${currentModule?.title} - Test`,
		description: currentModule?.description || 'Learn anything you want',
	}
}

export default async function TestPage({
	params,
	searchParams,
}: {
	params: Promise<{ id: string }>
	searchParams?: Promise<{ type?: string; questions: string }>
}) {
	const id = (await params).id
	const [cardsProgress, moduleProgress] = await Promise.all([
		getCardProgressByModuleId(id),
		getModuleProgress(id),
	])
	const queryParametres = await searchParams
	const count = queryParametres?.questions
		? Math.max(+queryParametres.questions, 10)
		: 10
	const selectedTypes: ('write' | 'select' | 'match')[] = queryParametres?.type
		? (queryParametres?.type.split(';') as ('write' | 'select' | 'match')[])
		: ['write']
	const questions = generateTestQuestions(cardsProgress, count, selectedTypes)

	return (
		<main>
			<h1 className={styles.title}>
				<Link href={`${ROUTES.MODULE}/${id}`}>
					{moduleProgress.module.title}
				</Link>
			</h1>
			<TestQuestions questions={questions} moduleId={id} />
		</main>
	)
}
