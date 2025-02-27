'use client'

import { Button, IconCongratulations } from '@/shared/ui'
import styles from './styles.module.scss'

interface Props {
	questionsCount: number
	onRepeat: () => void
	onReset: () => void
}

export default function Congratulations({
	questionsCount,
	onRepeat,
	onReset,
}: Props) {
	return (
		<div className={styles.congratulations}>
			{questionsCount === 0 ? (
				<>
					<h1>Поздравляем, вы прошли модуль!</h1>
					<h3>Вопросы закончились</h3>
					<IconCongratulations size={520} className={styles.icon} />
					<Button onClick={onReset} className={styles.button}>
						Начать сначала
					</Button>
				</>
			) : (
				<>
					<h1>Продолжить изучать модуль?</h1>
					<h3>Вы отлично справляетесь!</h3>
					<Button onClick={onRepeat} className={styles.button}>
						Далее
					</Button>
				</>
			)}
		</div>
	)
}
