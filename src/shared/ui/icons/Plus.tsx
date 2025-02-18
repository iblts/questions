import type { IconProps } from '@/shared/types'

export default function IconPlus({
	size = 24,
	fill = '#000',
	...props
}: IconProps) {
	return (
		<svg
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			width={size}
			height={size}
			{...props}
		>
			<g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
			<g
				id='SVGRepo_tracerCarrier'
				strokeLinecap='round'
				strokeLinejoin='round'
			></g>
			<g id='SVGRepo_iconCarrier'>
				<path
					d='M6 12H18M12 6V18'
					stroke={fill}
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
				></path>
			</g>
		</svg>
	)
}
