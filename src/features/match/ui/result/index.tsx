import { Button } from '@/shared/ui'
import { millisecondsToTime } from '@/shared/utils/helpers'
import styles from './match-cards-result.module.scss'

export const MatchCardsResult = ({
	result,
	onReset,
}: {
	result: number
	onReset: () => void
}) => {
	return (
		<section className={styles.body}>
			<h3>Ваш результат: {millisecondsToTime(result, true)}</h3>
			<Button onClick={onReset}>Перезапустить</Button>
		</section>
	)
}
