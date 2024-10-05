export async function signUp(formData: FormData) {
	'use server'

	const formDataRaw = {
		login: formData.get('login') as string,
		password: formData.get('password') as string,
		confirmPassword: formData.get('confirmPassword') as string,
	}

	if (formDataRaw.password !== formDataRaw.confirmPassword) {
		throw new Error('Passwords do not match')
	}

	console.log(formDataRaw)
}
