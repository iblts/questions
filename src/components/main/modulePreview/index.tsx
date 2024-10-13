import { ModuleWithRelations } from '@/types/module'
import { UserWithRelations } from '@/types/user'
import Link from 'next/link'
import styles from './styles.module.scss'

interface Props {
	module: ModuleWithRelations
	user?: UserWithRelations
}

export default function ModulePreview({ module, user }: Props) {
	return (
		<Link href={`/module/${module.id}`} className={styles.module}>
			<p className={styles.title}>{module.title}</p>
			<p className={styles.quantity}>{module.cards.length} терминов</p>
			<p className={styles.description}>{module.description}</p>
			<p className={styles.author}>
				{(user && user.login) || module.author?.login || 'anonymous'}
			</p>
		</Link>
	)
}
