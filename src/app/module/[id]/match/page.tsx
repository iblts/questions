import { getModule } from '@/entities/module'
import type { Metadata } from 'next'

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

export default function Page() {
	return (
		<main>
			<h1>В разработке...</h1>
		</main>
	)
}
