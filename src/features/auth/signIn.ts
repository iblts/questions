export async function signIn(formData: FormData) {
	'use server'

	const formDataRaw = {
		email: formData.get('login') as string,
		password: formData.get('password') as string,
	}

	console.log(formDataRaw)
}
