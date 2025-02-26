'use client'

import { useEffect, useState } from 'react'

const getIsMobile = () => window.innerWidth <= 768
const getIsTablet = () => window.innerWidth > 768 && window.innerWidth <= 1200

function useSize(func: () => boolean) {
	const [isMobile, setIsMobile] = useState(func())

	useEffect(() => {
		const onResize = () => {
			setIsMobile(func())
		}

		window.addEventListener('resize', onResize)

		return () => {
			window.removeEventListener('resize', onResize)
		}
	}, [func])

	return isMobile
}

export function useIsMobile() {
	return useSize(getIsMobile)
}

export function useIsTablet() {
	return useSize(getIsTablet)
}
