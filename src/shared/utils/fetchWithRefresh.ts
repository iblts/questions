import { API_ROUTES } from '../constants'

export async function fetchWithRefresh(url: string, options: RequestInit = {}) {
	let response = await fetch(url, { ...options, credentials: 'include' })

	if (response.status === 401) {
		const refreshResponse = await fetch(API_ROUTES.REFRESH, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
		})

		if (!refreshResponse.ok) {
			throw new Error(
				`Не удалось обновить токен. Пользователь не авторизован. ${refreshResponse.status}`
			)
		}

		response = await fetch(url, { ...options, credentials: 'include' })
	}

	if (!response.ok) {
		const errorText = await response.text()
		throw new Error(errorText || 'Ошибка запроса')
	}

	return response.json()
}
