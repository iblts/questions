interface CreateModuleProgress {
	moduleId: string
	userId: string
}

export async function createModuleProgress(data: CreateModuleProgress) {
	const fetchedModuleProgress = await fetch(
		`${process.env.API_URL}/moduleProgress`,
		{
			method: 'POST',
			body: JSON.stringify(data),
		}
	)

	return await fetchedModuleProgress.json()
}
