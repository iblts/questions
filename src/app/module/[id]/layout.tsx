import Container from '@/components/container'
import type { ReactNode } from 'react'

export default function ModuleLayout({ children }: { children: ReactNode }) {
	return <Container width={1000}>{children}</Container>
}
