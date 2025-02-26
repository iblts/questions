'use client'

import { useIsMobile, useIsTablet } from '@/shared/utils'
import type { ReactNode } from 'react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import './styles.scss'

interface Props {
	children?: ReactNode[]
	className: string
}

export default function Slider({ children, className }: Props) {
	const isMobile = useIsMobile()
	const isTablet = useIsTablet()

	return (
		<Swiper
			spaceBetween={48}
			slidesPerView={isMobile ? 1 : isTablet ? 2 : 3}
			modules={[Navigation]}
			navigation
			className={className}
		>
			{children?.map((child, index) => (
				<SwiperSlide key={index}>{child}</SwiperSlide>
			))}
		</Swiper>
	)
}
