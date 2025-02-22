'use client'

import { ModulePreview } from '@/entities/module'
import { useAuth } from '@/features/auth'
import { ROUTES } from '@/shared/constants'
import { Button, IconPlus, Slider } from '@/shared/ui'
import styles from './styles.module.scss'

export default function UserModulesList() {
	const { data: user, isLoading, isRefetching } = useAuth()

	if (isLoading || isRefetching) {
		return (
			<div className={styles.skeletonList}>
				{new Array(3).fill('').map((_, i) => (
					<div key={i} className='skeleton' />
				))}
			</div>
		)
	}

	if (!user?.modules || user.modules.length === 0) {
		return (
			<Button
				variant='secondary'
				className={styles.createModule}
				link={ROUTES.CREATE}
			>
				<IconPlus fill='#fff' size={76} />
			</Button>
		)
	}

	return (
		<Slider className={styles.modules}>
			{user?.modules?.map(module => (
				<ModulePreview module={module} key={module.id} />
			))}
		</Slider>
	)
}
