import React, { useEffect, useState } from 'react'
import { AuthContext } from './context/AuthContext'
import { getAuthToken } from './helper/authToken.helper'
import { RootNavigator } from './navigation/RootNavigator'

export default function App() {
  const [userToken, setUserToken] = useState<string | null>(null)

  useEffect(() => {
    const checkToken = async () => {
      const token = await getAuthToken() // lấy từ SecureStore
      if (token) {
        setUserToken(token)
      }
    }
    checkToken()
  }, [])
  return (
    <AuthContext.Provider value={{ userToken, setUserToken }}>
      {/* <NavigationContainer> */}
      <RootNavigator />
      {/* </NavigationContainer> */}
    </AuthContext.Provider>
  )
}
