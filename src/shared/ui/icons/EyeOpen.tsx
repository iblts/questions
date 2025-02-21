import type { IconProps } from '@/shared/types'

export default function IconEyeOpen({
	size = 24,
	fill = '#2a2a2f',
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
				<path d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z' />
				<path d='M12.001 5C7.524 5 3.733 7.943 2.46 12c1.274 4.057 5.065 7 9.542 7 4.478 0 8.268-2.943 9.542-7-1.274-4.057-5.064-7-9.542-7Z' />
			</g>
		</svg>
	)
}
