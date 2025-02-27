import Container from '@/shared/ui/container'
import type { ReactNode } from 'react'

export default function ModuleLayout({ children }: { children: ReactNode }) {
	return (
		<Container width={1000} padding={0}>
			{children}
		</Container>
	)
}
