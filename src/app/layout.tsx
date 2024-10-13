import Container from '@/components/container'
import Header from '@/components/header'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.scss'

const montserrat = Montserrat({
	subsets: ['latin', 'cyrillic'],
	weight: ['400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
	title: { absolute: 'Questions', template: '%s | Questions' },
	description: 'Learn anything you want',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={montserrat.className}>
				<Container>
					<Header />
					{children}
				</Container>
			</body>
		</html>
	)
}
