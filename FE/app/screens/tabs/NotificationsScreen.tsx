// NotificationScreen.tsx
import { NotificationAPI } from '@/app/apis/Notification.api'
import { INotification } from '@/app/inteface/Notification.inteface'
import { Ionicons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'

function NotificationScreen() {
  const [noti, setNoti] = useState<INotification[]>([])
  const [loading, setLoading] = useState(true)

  const getIconName = (type: any) => {
    switch (type) {
      case 'like':
        return 'heart'
      case 'comment':
        return 'chatbubble'
      case 'follow':
        return 'person-add'
      case 'mention':
        return 'at'
      case 'reply':
        return 'return-down-back'
      case 'system':
        return 'alert-circle'
      default:
        return 'notifications'
    }
  }

  useEffect(() => {
    NotificationAPI.getForUser()
      .then((res) => {
        setNoti(res.data.data)
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const markAsRead = (id: string) => {}

  const renderItem = ({ item }: any) => (
    <TouchableOpacity style={[styles.notification, !item.isRead && styles.unread]} onPress={() => markAsRead(item._id)}>
      <Ionicons name={getIconName(item.notificationType)} size={24} color="#007bff" style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.message}>{item.message}</Text>
        <Text style={styles.time}>{new Date(item.createdAt).toLocaleString('vi-VN')}</Text>
      </View>
    </TouchableOpacity>
  )

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" color="#007bff" />

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thông báo</Text>
      <FlatList
        data={noti}
        renderItem={renderItem}
        keyExtractor={(item) => item._id || ''}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 50, paddingHorizontal: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  notification: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  unread: { backgroundColor: '#e6f0ff' },
  icon: { marginRight: 12, marginTop: 5 },
  textContainer: { flex: 1 },
  message: { fontSize: 16 },
  time: { fontSize: 12, color: '#888', marginTop: 4 },
})

export default NotificationScreen
