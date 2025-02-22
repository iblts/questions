import classNames from 'classnames'
import styles from './page.module.scss'

export default function Loading() {
	return (
		<div className={styles.skeleton}>
			<div className={classNames('skeleton', styles.title)} />
			<div className={classNames('skeleton', styles.card)} />
		</div>
	)
}
