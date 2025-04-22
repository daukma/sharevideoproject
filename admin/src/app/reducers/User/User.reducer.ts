import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from './../../../inteface/User.interface'
import { RootState } from '../../store'

const initialState: IUser[] = []

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    AddUser: (state, action: PayloadAction<IUser>) => {
      state.push(action.payload)
      return state
    },
    UpdateUser: (state, action: PayloadAction<IUser>) => {
      const index = state.findIndex((el) => el._id === action.payload._id)
      if (index > -1) {
        state[index] = {
          ...state[index],
          name: action.payload.name,
        }
        return state
      }
    },
    PutUser: (state, action: PayloadAction<IUser>) => {
      const index = state.findIndex((el) => el._id === action.payload._id)
      if (index > -1) {
        state[index] = {
          ...state[index],
          name: action.payload.name,
        }
        return state
      } else {
        state.push(action.payload)
        return state
      }
    },

    DeleteUser: (state, action: PayloadAction<IUser>) => {
      const index = state.findIndex((el) => el._id === action.payload._id)
      if (index > -1) {
        state.splice(index, 1)
        return state
      }
    },
    SetUser: (state, action: PayloadAction<IUser[]>) => {
      state = action.payload
      return state
    },
  },
})

export const { AddUser, UpdateUser, DeleteUser, PutUser, SetUser } = UserSlice.actions

export const GetUser = (state: RootState) => state.user
export default UserSlice.reducer
