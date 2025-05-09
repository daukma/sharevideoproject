import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import { ActivityIndicator, Card, Text, TextInput } from 'react-native-paper'

const mockData = [
  { id: '1', title: 'Video hướng dẫn React Native' },
  { id: '2', title: 'Đăng nhập và Đăng ký bằng JWT' },
  { id: '3', title: 'Video học máy cơ bản' },
]

const SearchScreen = () => {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(mockData)

  const handleSearch = () => {
    setLoading(true)
    setTimeout(() => {
      const filtered = mockData.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()))
      setResults(filtered)
      setLoading(false)
    }, 500) // mô phỏng API
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          placeholder="Tìm kiếm video..."
          value={query}
          onChangeText={setQuery}
          style={styles.input}
          mode="outlined"
        />
        <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
          <Ionicons name="search" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator animating color="#6200ee" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card style={styles.card}>
              <Card.Content>
                <Text>{item.title}</Text>
              </Card.Content>
            </Card>
          )}
          ListEmptyComponent={<Text style={styles.noResult}>Không tìm thấy kết quả</Text>}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: '#fff',
  },
  searchBar: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  input: {
    flex: 1,
  },
  searchButton: {
    backgroundColor: '#6200ee',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    marginLeft: 8,
    borderRadius: 4,
  },
  card: {
    marginBottom: 10,
  },
  noResult: {
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
  },
})

export default SearchScreen
