// ProfileScreen.tsx
import { AuthAPI } from '@/app/apis/Auth.api'
import { VideoAPI } from '@/app/apis/Video.api'
import { AppConfig } from '@/app/AppConfig'
import { useAuth } from '@/app/context/AuthContext'
import { removeAuthToken } from '@/app/helper/authToken.helper'
import { IUser } from '@/app/inteface/User.interface'
import { IVideo } from '@/app/inteface/Video.interface'
import React, { useEffect, useState } from 'react'
import { Alert, Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ActivityIndicator, Button, IconButton } from 'react-native-paper'

const numColumns = 3
const screenWidth = Dimensions.get('window').width
const itemSize = screenWidth / numColumns

function ProfileScreen() {
  const [profile, setProfile] = useState<IUser>()
  const [videos, setVideos] = useState<IVideo[]>([])
  const [loading, setLoading] = useState(true)

  const { setUserToken } = useAuth()
  const getProfile = async () => {
    try {
      await AuthAPI.getProfile()
        .then((res) => {
          if (res.data.status) {
            setProfile(res.data.data.user)
          } else {
            Alert.alert('❌ Thất bại', 'Lấy thông tin thất bại')
          }
        })
        .finally(() => setLoading(false))
    } catch (error) {
      Alert.alert('❌ Thất bại', 'Lỗi mạng')
      console.log(error)
      handleLogout()
    }
  }

  const getVideo = async (id: string) => {
    try {
      await VideoAPI.fetchbyUser(id)
        .then((res) => {
          setVideos(res.data.data)
        })
        .catch((er) => console.log(er))
        .finally(() => setLoading(false))
    } catch (error) {}
  }

  const handleLogout = async () => {
    await removeAuthToken() // xoá token khỏi storage
    setUserToken(null) // cập nhật context
  }

  useEffect(() => {
    getProfile()
  }, [])
  const renderVideoItem = ({ item }: { item: IVideo }) => (
    <TouchableOpacity style={styles.videoItem}>
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} resizeMode="cover" />
    </TouchableOpacity>
  )

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" color="#007bff" />
  }

  return (
    <View style={styles.container}>
      <View style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button onPress={handleLogout} style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton
            icon="logout" // Bạn có thể chọn icon khác nếu muốn
            size={30}
            style={styles.logoutBtn}
            // Gọi hàm handleLogout khi nhấn
          />
        </Button>
      </View>
      <View style={styles.header}>
        <Image source={{ uri: AppConfig.baseUrl + profile?.profile }} style={styles.avatar} />
        <Text style={styles.username}>{profile?.username}</Text>
        <View style={{ display: 'flex', flexDirection: 'row', gap: 20 }}>
          <Text style={styles.videoCount}>10 follower</Text>
          <Text style={styles.videoCount}>12 follow</Text>
          <Text style={styles.videoCount}>{videos.length} video</Text>
        </View>
      </View>

      {/* Danh sách video dạng thumbnail grid */}
      {videos.length === 0 ? (
        <Text style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>Bạn chưa đăng tải video nào</Text>
      ) : (
        <FlatList
          data={videos}
          renderItem={renderVideoItem}
          keyExtractor={(item) => item._id || ''}
          numColumns={numColumns}
          contentContainerStyle={styles.videoGrid}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ddd',
  },
  username: { fontSize: 20, fontWeight: 'bold', marginTop: 10 },
  videoCount: { color: '#666', marginTop: 4, display: 'flex' },
  videoGrid: { paddingTop: 10 },
  videoItem: {
    width: itemSize,
    height: itemSize,
    padding: 1,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ccc',
  },
  logoutBtn: {
    position: 'absolute',
    top: 10,
    right: 15,
    padding: 8,
  },
})

export default ProfileScreen
