export async function getModuleProgress(userId: string, moduleId: string) {
	const fetchedModules = await fetch(
		`${process.env.API_URL}/moduleProgress/module/${moduleId}/${userId}`
	)

	return await fetchedModules.json()
}
