import type { IconProps } from '@/shared/types'

export default function IconCards({
	size = 24,
	fill = '#0F0F0F',
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
			<path
				d='M5.707 9.71a1 1 0 0 0 0 1.415l4.892 4.887a2 2 0 0 0 2.828 0l4.89-4.89a1 1 0 1 0-1.414-1.415l-4.185 4.186a1 1 0 0 1-1.415 0L7.121 9.71a1 1 0 0 0-1.414 0Z'
				fill={fill}
			/>
		</svg>
	)
}
