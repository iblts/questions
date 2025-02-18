import {
	asyncThunkCreator,
	buildCreateSlice,
	combineSlices,
	createAsyncThunk,
	createSelector,
} from '@reduxjs/toolkit'
import { useDispatch, useSelector, useStore } from 'react-redux'
import type { store } from './store'

export const rootReducer = combineSlices()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AppState = any
export type AppDispatch = typeof store.dispatch

export const useAppSelector = useSelector.withTypes<AppState>()
export const useAppDispath = useDispatch.withTypes<AppDispatch>()
export const useAppStore = useStore.withTypes<typeof store>()
export const createAppSelector = createSelector.withTypes<AppState>()
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
	state: AppState
	dispatch: AppDispatch
}>()

export const createSlice = buildCreateSlice({
	creators: { asyncThunk: asyncThunkCreator },
})
