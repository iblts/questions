import { rootReducer } from '@/shared/lib/redux'
import { User } from '@prisma/client'
import { createSlice } from '@reduxjs/toolkit'

export interface CounterState {
	user: Partial<Omit<User, 'hashedPassword'>>
}

const initialState: CounterState = {
	user: { id: undefined, login: undefined },
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
}).injectInto(rootReducer)
