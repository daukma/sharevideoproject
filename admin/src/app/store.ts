import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'

import LoadingReducer from './reducers/Loading/Loading.reducer'
import UserReducer from './reducers/User/User.reducer'

export const store = configureStore({
  reducer: {
    loading: LoadingReducer,
    user: UserReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
