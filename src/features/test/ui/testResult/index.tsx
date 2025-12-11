'use client'

import { millisecondsToTime } from '@/shared/utils/helpers'
import { useTestStore } from '../../model/useTestStore'
import styles from './testResult.module.scss'

export const TestResult = () => {
	const { score, startTime, endTime } = useTestStore()
	const duration =
		endTime && startTime ? millisecondsToTime(endTime - startTime) : '00:00:000'

	return (
		<div className={styles.content}>
			<p className={styles.result}>
				Ваш результат: <b>{score} из 100</b>
			</p>
			<p className={styles.time}>
				Время: <b>{duration}</b>
			</p>
		</div>
	)
}
