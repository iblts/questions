import type { IconProps } from '@/shared/types'

export default function IconCards({
	size = 24,
	fill = '#fff',
	...props
}: IconProps) {
	return (
		<svg
			width={size}
			height={(size * 22) / 24}
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				d='M0 1.26v19.47c0 .42.1.74.32.95.21.21.53.32.96.32h14.11c.43 0 .75-.11.96-.32.22-.21.32-.53.32-.95V1.26c0-.42-.1-.74-.32-.95-.21-.21-.53-.31-.96-.31H1.28C.85 0 .53.1.32.31.1.52 0 .84 0 1.26Zm2.56 18.2V2.53h11.55v16.93H2.56Z'
				fill={fill}
				fillRule='evenodd'
			/>
			<path
				d='m16.5 15 5-8L16 4.5l.5 10.5Z'
				fill={fill}
				fillRule='evenodd'
				opacity='.15'
			/>
			<path
				d='M15.94 1.81c-.65-.3-1.41-.04-1.71.61-.31.64-.04 1.38.61 1.68l6.02 2.81-6.59 11.5c-.35.62-.14 1.38.49 1.73.62.35 1.39.14 1.75-.48l7.27-12.69c.01-.03.03-.06.04-.09.36-.76.16-1.33-.61-1.69l-7.27-3.38Z'
				fill={fill}
				fillRule='evenodd'
			/>
		</svg>
	)
}
