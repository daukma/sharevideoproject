import * as SecureStore from 'expo-secure-store'

const TOKEN_KEY = 'accessToken'

export const setTokenSecureStore = async (token: string) => {
  await SecureStore.setItemAsync(TOKEN_KEY, token)
}

export const getTokenSecureStore = async (): Promise<string | null> => {
  return await SecureStore.getItemAsync(TOKEN_KEY)
}

export const removeTokenSecureStore = async () => {
  await SecureStore.deleteItemAsync(TOKEN_KEY)
}
