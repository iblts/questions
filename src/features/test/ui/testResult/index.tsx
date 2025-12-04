'use client'

import { Button } from '@/shared/ui'
import { millisecondsToTime } from '@/shared/utils/helpers'
import { useTestStore } from '../../model/useTestStore'
import styles from './testResult.module.scss'

export const TestResult = () => {
	const { score, startTime, endTime, resetTest } = useTestStore()
	const duration =
		endTime && startTime ? millisecondsToTime(endTime - startTime) : '00:00:000'

	return (
		<div className={styles.content}>
			<h2 className={styles.title}>Результаты теста</h2>
			<p className={styles.result}>
				Ваш результат: <b>{score} из 100</b>
			</p>
			<p className={styles.time}>
				Время: <b>{duration}</b>
			</p>

			<div className={styles.buttons}>
				<Button onClick={resetTest}>Пройти снова</Button>
			</div>
		</div>
	)
}
