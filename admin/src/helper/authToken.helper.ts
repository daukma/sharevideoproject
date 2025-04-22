import { setTokenLocalStorage, getTokenLocalStorage, removeTokenLocalStorage } from './localStorage.helper'

export const getAuthToken = () => {
  const token = getTokenLocalStorage()
  if (token) {
    return token
  } else {
    return null
  }
}

export const setAuthToken = (token: string) => {
  setTokenLocalStorage(token)
}

export const removeAuthToken = () => {
  removeTokenLocalStorage()
}
