'use client'

import { type MouseEvent, useState } from 'react'

export const useModal = (initial = false) => {
	const [isOpen, setOpen] = useState(initial)

	const openModal = () => setOpen(true)
	const closeModal = (
		e?: MouseEvent<HTMLButtonElement> | MouseEvent<HTMLAnchorElement>
	) => {
		e?.stopPropagation()
		setOpen(false)
	}
	const toggleModal = () => setOpen(prev => !prev)

	return {
		isOpen,
		openModal,
		closeModal,
		toggleModal,
	}
}
