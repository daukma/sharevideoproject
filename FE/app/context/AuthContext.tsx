import React, { createContext, useContext } from 'react'

type AuthContextType = {
  userToken: string | null
  setUserToken: React.Dispatch<React.SetStateAction<string | null>>
}
export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
