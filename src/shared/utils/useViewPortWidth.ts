'use client'

import { useEffect, useState } from 'react'

export const useViewPortWidth = () => {
	const [width, setWidth] = useState(0)
	useEffect(() => {
		const handleResize = () => setWidth(window.innerWidth)
		handleResize()

		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])
	return { isMobile: width <= 768, isTablet: width > 768 && width <= 1200 }
}
