import { VideoAPI } from '@/app/apis/Video.api'
import { AppConfig } from '@/app/AppConfig'
import { useAuth } from '@/app/context/AuthContext'
import { IVideo } from '@/app/inteface/Video.interface'
import { AntDesign } from '@expo/vector-icons'
import { useFocusEffect } from '@react-navigation/native'
import { ResizeMode, Video } from 'expo-av'
import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Dimensions, FlatList, StyleSheet, TouchableOpacity, View, ViewToken } from 'react-native'
import { Text } from 'react-native-paper'

const { height } = Dimensions.get('window')

const HomeScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [listVideo, setListVideo] = useState<IVideo[]>([])
  const [current, setCurrent] = useState(1)
  const [likedVideos, setLikedVideos] = useState<string[]>([])
  const pageSize = 10
  const [isBuffering, setIsBuffering] = useState(true)
  const [shouldPlay, setShouldPlay] = useState(false) // Quản lý trạng thái play video
  const videoRefs = useRef<any[]>([])
  const { setUserToken } = useAuth()
  // In ra chiều cao

  useEffect(() => {
    try {
      VideoAPI.fetchAll({ search: '', page: current, limit: pageSize })
        .then((res) => {
          setListVideo(res.data.data)
        })
        .catch((err) => console.log(err))
    } catch (error) {
      // xoá token khỏi storage
      setUserToken(null)
    }
  }, [])

  const toggleLike = (id: string) => {
    setLikedVideos((prev) => (prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]))
  }

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0) {
      const nextIndex = Number(viewableItems[0].index)
      setCurrentIndex(nextIndex)

      videoRefs.current.forEach((video, idx) => {
        if (!video) return

        if (idx === nextIndex) {
          video.replayAsync() // Phát lại video khi chuyển đến
        } else {
          video.pauseAsync() // Dừng video khi chuyển đi
          video.setPositionAsync(0) // Reset về đầu video
        }
      })
    }
  }).current

  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 90 }).current

  const renderItem = ({ item, index }: { item: IVideo; index: number }) => {
    const isLiked = likedVideos.includes(item._id!)
    return (
      <View style={styles.videoContainer}>
        <Video
          ref={(ref) => {
            videoRefs.current[index] = ref
          }}
          source={{ uri: AppConfig.baseUrl + item.videoUrl }}
          style={styles.video}
          resizeMode={ResizeMode.COVER}
          isLooping
          useNativeControls={false}
          onLoadStart={() => setIsBuffering(true)}
          onReadyForDisplay={() => setIsBuffering(false)}
          shouldPlay={index === currentIndex && shouldPlay} // Điều kiện play video
        />
        <TouchableOpacity style={styles.heartIcon} onPress={() => toggleLike(item._id!)}>
          <AntDesign name={isLiked ? 'heart' : 'hearto'} size={32} color={isLiked ? 'red' : 'white'} />
        </TouchableOpacity>
        {isBuffering && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        )}
        <View style={styles.textOverlay}>
          <Text style={styles.text}>{item.title}</Text>
        </View>
      </View>
    )
  }

  // Khi chuyển tab (unfocus), dừng và reset video
  useFocusEffect(
    React.useCallback(() => {
      // Khi tab mất focus, dừng và reset tất cả video
      videoRefs.current.forEach((video) => {
        if (video) {
          video.pauseAsync()
          video.setPositionAsync(0)
        }
      })

      // Khi tab quay lại, đặt trạng thái để video phát lại
      setShouldPlay(true)

      // Khi tab mất focus, dừng phát video
      return () => setShouldPlay(false)
    }, []),
  )

  return (
    <FlatList
      data={listVideo}
      keyExtractor={(item, index) => item._id!}
      renderItem={renderItem}
      pagingEnabled
      showsVerticalScrollIndicator={false}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={viewabilityConfig}
      snapToInterval={height - 140}
      decelerationRate="fast"
    />
  )
}

const styles = StyleSheet.create({
  videoContainer: {
    height: height - 140,
    width: '100%',
    backgroundColor: '#000',
  },
  video: {
    height: '100%',
    width: '100%',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  textOverlay: {
    position: 'absolute',
    height: 100,
    left: 10,
    bottom: 0,
    right: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  heartIcon: {
    position: 'absolute',
    top: 30,
    right: 20,
    zIndex: 10,
  },
})

export default HomeScreen
