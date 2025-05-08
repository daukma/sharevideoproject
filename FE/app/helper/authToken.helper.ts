import { getTokenSecureStore, removeTokenSecureStore, setTokenSecureStore } from './storage.helper'

export const getAuthToken = async (): Promise<string | null> => {
  const token = await getTokenSecureStore()
  return token ?? null
}

export const setAuthToken = async (token: string) => {
  await setTokenSecureStore(token)
}

export const removeAuthToken = async () => {
  await removeTokenSecureStore()
}
