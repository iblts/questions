export const getRandomItems = <T>(array: T[], count: number = 1): T[] => {
	const shuffled = [...array].sort(() => Math.random() - 0.5)
	return shuffled.slice(0, count)
}

export const replaceArrayElement = <T>(
	array: T[],
	index: number,
	replaceTo: T
): T[] => {
	return [...array.slice(0, index), replaceTo, ...array.slice(index + 1)]
}

export const millisecondsToString = (milliseconds: number) => {
	const totalSeconds = Math.floor(milliseconds / 1000)
	const minutes = Math.floor(totalSeconds / 60)
	const seconds = totalSeconds % 60

	return `${minutes} мин, ${seconds} с`
}

export const millisecondsToTime = (
	milliseconds: number,
	withMilliseconds: boolean = false
) => {
	const totalSeconds = Math.floor(milliseconds / 1000)
	const minutes = Math.floor(totalSeconds / 60)
	const seconds = totalSeconds % 60
	const ms = Math.floor((milliseconds % 1000) / 100)

	return `${minutes.toString().padStart(2, '0')}:${seconds
		.toString()
		.padStart(2, '0')}${withMilliseconds ? '.' + ms : ''}`
}
