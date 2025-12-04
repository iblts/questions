import styles from './styles.module.scss'

export const ProgressBar = ({
	currentLength,
	totalLength,
}: {
	currentLength: number
	totalLength: number
}) => {
	return (
		<div className={styles.progressBar}>
			<div
				className={styles.progressLine}
				style={{
					width: (currentLength / totalLength) * 100 + '%',
				}}
			></div>
		</div>
	)
}
