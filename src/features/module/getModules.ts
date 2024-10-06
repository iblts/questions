export async function getModules() {
	const fetchedModules = await fetch(`${process.env.API_URL}/module`)

	return await fetchedModules.json()
}
