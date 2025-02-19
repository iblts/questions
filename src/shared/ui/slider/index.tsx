'use client'

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
	return (
		<Swiper
			spaceBetween={48}
			slidesPerView={3}
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
