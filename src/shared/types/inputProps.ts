import type { InputHTMLAttributes, RefObject } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string
	error?: string
	reference?: RefObject<HTMLInputElement>
	register?: UseFormRegisterReturn<string>
}
