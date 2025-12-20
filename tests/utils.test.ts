import {
	getRandomItems,
	millisecondsToString,
	millisecondsToTime,
	replaceArrayElement,
} from '../src/shared/utils/helpers'

// getRandomItems
describe('getRandomItems', () => {
	it('возвращает массив указанной длины', () => {
		const arr = [1, 2, 3, 4, 5]
		const result = getRandomItems(arr, 2)
		expect(result.length).toBe(2)
	})

	it('не мутирует исходный массив', () => {
		const arr = [1, 2, 3]
		getRandomItems(arr)
		expect(arr).toEqual([1, 2, 3])
	})

	it('возвращает все элементы, если count > длины массива', () => {
		const arr = [1, 2]
		const result = getRandomItems(arr, 5)
		expect(result).toEqual([1, 2])
	})

	it('корректно работает с детерминированным Math.random', () => {
		jest.spyOn(global.Math, 'random').mockReturnValue(0.5)
		const arr = ['a', 'b', 'c']
		const result = getRandomItems(arr, 2)
		expect(result).toEqual(['a', 'b'])
		jest.spyOn(global.Math, 'random').mockRestore()
	})
})

// replaceArrayElement
describe('replaceArrayElement', () => {
	it('заменяет элемент по индексу', () => {
		const arr = [1, 2, 3]
		const result = replaceArrayElement(arr, 1, 99)
		expect(result).toEqual([1, 99, 3])
	})

	it('не мутирует исходный массив', () => {
		const arr = [1, 2, 3]
		replaceArrayElement(arr, 0, 99)
		expect(arr).toEqual([1, 2, 3])
	})

	it('корректно заменяет первый элемент', () => {
		const arr = [1, 2, 3]
		expect(replaceArrayElement(arr, 0, 99)).toEqual([99, 2, 3])
	})

	it('корректно заменяет последний элемент', () => {
		const arr = [1, 2, 3]
		expect(replaceArrayElement(arr, 2, 99)).toEqual([1, 2, 99])
	})
})

// millisecondsToString
describe('millisecondsToString', () => {
	it('конвертирует 0 мс', () => {
		expect(millisecondsToString(0)).toBe('0 мин, 0 с')
	})

	it('конвертирует меньше минуты', () => {
		expect(millisecondsToString(59999)).toBe('0 мин, 59 с') // 59.999 сек
	})

	it('конвертирует ровно минуту', () => {
		expect(millisecondsToString(60000)).toBe('1 мин, 0 с')
	})

	it('конвертирует больше минуты', () => {
		expect(millisecondsToString(123456)).toBe('2 мин, 3 с') // 123.456 сек = 2 мин 3 сек
	})
})

// millisecondsToTime
describe('millisecondsToTime', () => {
	it('форматирует без миллисекунд (MM:SS)', () => {
		expect(millisecondsToTime(0)).toBe('00:00')
		expect(millisecondsToTime(61234)).toBe('01:01') // 61.234 сек = 1 мин 1 сек
	})

	it('форматирует с миллисекундами (MM:SS.M)', () => {
		expect(millisecondsToTime(1234, true)).toBe('00:01.2') // 1.234 сек → 234 мс / 100 = 2
		expect(millisecondsToTime(999, true)).toBe('00:00.9') // 999 мс → 9
	})

	it('добавляет ведущие нули', () => {
		expect(millisecondsToTime(5000)).toBe('00:05')
		expect(millisecondsToTime(3600000)).toBe('60:00')
	})
})
