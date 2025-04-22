const setTokenLocalStorage = (token: string) => {
  localStorage.setItem('accessToken', token)
}

const getTokenLocalStorage = () => {
  return localStorage.getItem('accessToken') || null
}

const removeTokenLocalStorage = () => {
  localStorage.removeItem('accessToken')
}

export { setTokenLocalStorage, getTokenLocalStorage, removeTokenLocalStorage }
