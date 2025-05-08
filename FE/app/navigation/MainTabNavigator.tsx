import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import HomeScreen from '../screens/tabs/HomeScreen'
import NotificationsScreen from '../screens/tabs/NotificationsScreen'
import ProfileScreen from '../screens/tabs/ProfileScreen'
import SearchScreen from '../screens/tabs/SearchScreen'

const Tab = createBottomTabNavigator()

export const MainTabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarStyle: {
          height: 70,
        },
        headerShown: false,
      }}
    />
    <Tab.Screen name="Notifications" component={NotificationsScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
    <Tab.Screen name="Search" component={SearchScreen} />
  </Tab.Navigator>
)
