// ProfileScreen.tsx
import { AuthAPI } from '@/app/apis/Auth.api'
import { useAuth } from '@/app/context/AuthContext'
import { removeAuthToken } from '@/app/helper/authToken.helper'
import { IUser } from '@/app/inteface/User.interface'
import React, { useEffect, useState } from 'react'
import { Alert, Dimensions, Image, Text, View } from 'react-native'
import { Button, Card } from 'react-native-paper'

const CARD_WIDTH = (Dimensions.get('window').width - 20) / 3

function ProfileScreen() {
  const [profile, setProfile] = useState<IUser>()

  const { setUserToken } = useAuth()

  const getProfile = async () => {
    try {
      await AuthAPI.getProfile().then((res) => {
        if (res.data.status) {
          setProfile(res.data.data.user)
        } else {
          Alert.alert('❌ Thất bại', 'Lấy thông tin thất bại')
        }
      })
    } catch (error) {
      Alert.alert('❌ Thất bại', 'Lỗi mạng')
      console.log(error)
      handleLogout()
    }
  }

  const handleLogout = async () => {
    await removeAuthToken() // xoá token khỏi storage
    setUserToken(null) // cập nhật context
  }

  useEffect(() => {
    getProfile()
  }, [])

  return (
    <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
      <Image source={{ uri: profile?.profile }} style={{ width: 100, height: 100, borderRadius: 50 }} />
      <Text>{profile?.username}</Text>

      <Button mode="contained" onPress={handleLogout}>
        Đăng xuất
      </Button>
      <View
        style={{
          flex: 1,
          marginTop: 10,
          flexDirection: 'row',
          gap: 4,
          flexWrap: 'wrap',
          padding: 4,
          width: '100%',
          borderColor: 'black',
          borderStyle: 'solid',
          borderWidth: 1,
        }}>
        <Card
          style={{
            padding: 16,
            width: CARD_WIDTH,
            height: 100,
            backgroundColor: '#689ac270',
            borderRadius: 5,
          }}>
          <Text>123 Views</Text>
        </Card>
        <Card
          style={{
            padding: 16,
            width: CARD_WIDTH,
            height: 100,
            backgroundColor: '#689ac270',
            borderRadius: 5,
          }}>
          <Text>123 Views</Text>
        </Card>
        <Card
          style={{
            padding: 16,
            width: CARD_WIDTH,
            height: 100,
            backgroundColor: '#689ac270',
            borderRadius: 5,
          }}>
          <Text>123 Views</Text>
        </Card>
        <Card
          style={{
            padding: 16,
            width: CARD_WIDTH,
            height: 100,
            backgroundColor: '#689ac270',
            borderRadius: 5,
          }}>
          <Text>123 Views</Text>
        </Card>
      </View>
    </View>
  )
}

export default ProfileScreen
