import QueryProvider from '@/shared/providers/QueryProvider'
import { Container } from '@/shared/ui'
import { Header } from '@/widgets/header'
import type { Metadata } from 'next'
import { Raleway } from 'next/font/google'
import './globals.scss'

const raleway = Raleway({
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
			<body className={raleway.className}>
				<QueryProvider>
					<Container>
						<Header />
						{children}
					</Container>
				</QueryProvider>
			</body>
		</html>
	)
}
