import { ProgressBar } from '@/shared/ui'
import styles from './page.module.scss'

export default function LoadingLearning() {
	return (
		<main className={styles.body}>
			<ProgressBar currentLength={0} totalLength={10} />
			<div className={styles.cardSkeleton}>
				<div className={styles.lableSkeleton} />
				<div className={styles.terminSkeleton} />
				<div className={styles.lableSkeleton} />
				<div className={styles.inputSkeleton} />
				<div className={styles.buttonSkeleton} />
			</div>
		</main>
	)
}
