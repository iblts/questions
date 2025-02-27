import classNames from 'classnames'
import styles from './page.module.scss'

export default function Loading() {
	return (
		<div className={styles.skeleton}>
			<div className={classNames('skeleton', styles.title)} />
			<section>
				<div className={styles.actions}>
					{new Array(4).fill('').map((_, i) => (
						<div key={i} className={classNames('skeleton', styles.action)} />
					))}
				</div>
				<div className={classNames('skeleton', styles.card)} />
			</section>
		</div>
	)
}
