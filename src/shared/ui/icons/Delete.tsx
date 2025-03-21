import type { IconProps } from '@/shared/types'

export default function IconDelete({
	size = 24,
	fill = '#fff',
	...props
}: IconProps) {
	return (
		<svg
			viewBox='0 0 24 24'
			width={size}
			height={size}
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<g
				stroke={fill}
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
			>
				<path d='M10 11v6M14 11v6M4 7h16M6 7h12v11a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3V7ZM9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2H9V5Z' />
			</g>
		</svg>
	)
}
