import { CommonActions, useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { AuthAPI } from '../apis/Auth.api'
import { useAuth } from '../context/AuthContext'
import { setAuthToken } from '../helper/authToken.helper'

const LoginScreen = () => {
  const { setUserToken } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState<boolean>(false)
  const navigation = useNavigation()

  const handleLogin = async () => {
    try {
      setLoading(true)
      await AuthAPI.login({ username, password })
        .then((res) => {
          setAuthToken(res.data.data.accessToken)
          setUserToken(res.data.data.accessToken)
          Alert.alert('🎉 Thành công', 'Đăng nhập thành công!')
        })
        .catch((error) => {
          Alert.alert('❌ Thất bại', 'Sai thông tin đăng nhập')
        })
        .finally(() => {
          setLoading(false)
        })
    } catch (error) {
      Alert.alert('❌ Thất bại', 'Lỗi mạng')
      console.log(error)
      setLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Chào mừng trở lại 👋</Text>

        <TextInput
          label="Username"
          value={username}
          onChangeText={setUsername}
          mode="outlined"
          style={styles.input}
          autoCapitalize="none"
        />
        <TextInput
          label="Mật khẩu"
          value={password}
          onChangeText={setPassword}
          mode="outlined"
          style={styles.input}
          secureTextEntry
        />

        <Button mode="contained" onPress={handleLogin} style={styles.button}>
          {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </Button>

        <TouchableOpacity
          onPress={() => {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'Register' }],
              }),
            )
          }}>
          <Text style={styles.registerLink}>
            Bạn chưa có tài khoản? <Text style={{ color: '#007bff' }}>Đăng ký</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  innerContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  logo: {
    width: 90,
    height: 90,
    alignSelf: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 32,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
    paddingVertical: 4,
  },
  registerLink: {
    textAlign: 'center',
    marginTop: 24,
    fontSize: 14,
    color: '#555',
  },
})
