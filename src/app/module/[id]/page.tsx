import CardsViewer from '@/components/cardsViewer/CardsViewer'
import Container from '@/components/container'
import { getAuth } from '@/features/auth/getAuth'
import { createModuleProgress } from '@/features/moduleProgress/createModuleProgress'
import { getModuleProgress } from '@/features/moduleProgress/getModuleProgress'
import { ModuleProgressWithRelations } from '@/types/moduleProgress'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import styles from './page.module.scss'

export const metadata: Metadata = {
	title: 'Module',
	description: '',
}

export default async function ModulePage({
	params,
}: {
	params: { id: string }
}) {
	const { user } = await getAuth()
	const { id } = params

	if (!user) {
		redirect('/auth/login')
	}

	let moduleProgress: ModuleProgressWithRelations = await getModuleProgress(
		user.id,
		id
	)

	if (!moduleProgress) {
		moduleProgress = await createModuleProgress({
			moduleId: id,
			userId: user.id,
		})
	}

	return (
		<main>
			<Container className={styles.body} width={1000}>
				<h1 className={styles.title}>{moduleProgress.module.title}</h1>
				<div className={styles.actions}>
					<Link href={`/module/${id}/flashcards`} className={styles.action}>
						<Image src='/cards.svg' alt='cards' width={24} height={24} />
						Карточки
					</Link>

					<Link href={`/module/${id}/learning`} className={styles.action}>
						<Image src='/learning.svg' alt='learning' width={24} height={24} />
						Заучивание
					</Link>

					<Link href={`/module/${id}/test`} className={styles.action}>
						<Image src='/test.svg' alt='test' width={24} height={24} />
						Тест
					</Link>

					<Link href={`/module/${id}/match`} className={styles.action}>
						<Image src='/match.svg' alt='match' width={24} height={24} />
						Подбор
					</Link>
				</div>
				<CardsViewer cards={moduleProgress.cardProgress} />
			</Container>
		</main>
	)
}
