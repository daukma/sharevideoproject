// NotificationScreen.tsx
import { NotificationAPI } from '@/app/apis/Notification.api'
import { INotification } from '@/app/inteface/Notification.inteface'
import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { Card } from 'react-native-paper'

function NotificationScreen() {
  const [noti, setNoti] = useState<INotification[]>([])

  useEffect(() => {
    NotificationAPI.getForUser()
      .then((res) => {
        setNoti(res.data.data)
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', gap: 3, padding: 5 }}>
      {noti.map((el) => {
        return (
          <Card
            style={{
              padding: 16,
              width: '100%',
              height: 100,
              backgroundColor: '#689ac270',
              borderRadius: 5,
              borderColor: '#000',
            }}
            key={el._id}>
            <Text key={el._id}>{el.message}</Text>
          </Card>
        )
      })}
    </View>
  )
}

export default NotificationScreen
