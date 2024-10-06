import CreateMain from '@/components/create/createMain'
import { getAuth } from '@/features/auth/getAuth'
import { redirect } from 'next/navigation'

export default async function Create() {
	const { user } = await getAuth()

	if (!user) {
		redirect('/auth/login')
	}

	return <CreateMain userId={user.id} />
}
