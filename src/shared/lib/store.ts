import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './redux'

export const store = configureStore({
	reducer: rootReducer,

	middleware: getDefaultMiddleware => getDefaultMiddleware(),
})
