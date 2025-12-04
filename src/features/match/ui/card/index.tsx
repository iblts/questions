import classNames from 'classnames'
import styles from './card.module.scss'

interface MatchCardProps extends React.LiHTMLAttributes<HTMLLIElement> {
	text?: string
	selected?: boolean
	error?: boolean
}

export const MatchCard = ({
	text,
	className,
	selected = false,
	error = false,
	...props
}: MatchCardProps) => {
	return (
		<li
			className={classNames(
				styles.card,
				{
					[styles.invisible]: !text,
					[styles.selected]: selected,
					[styles.error]: error,
				},
				className
			)}
			{...props}
		>
			{text}
		</li>
	)
}
