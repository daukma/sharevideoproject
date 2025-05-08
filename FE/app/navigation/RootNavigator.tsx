import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { useAuth } from '../context/AuthContext'
import { AuthNavigator } from './AuthNavigator'
import { MainTabNavigator } from './MainTabNavigator'

const Stack = createNativeStackNavigator()

export const RootNavigator = () => {
  const { userToken } = useAuth()

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {userToken ? (
        <Stack.Screen name="MainApp" component={MainTabNavigator} options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  )
}
