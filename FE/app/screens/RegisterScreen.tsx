import { CommonActions, useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { AuthAPI } from '../apis/Auth.api'

const RegisterScreen = () => {
  const [phone, setPhone] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const navigation = useNavigation()

  const handleRegister = async () => {
    console.log({ username, password, name, address, phone })
    await AuthAPI.register({ username, password, name, address, phone }).then((res) => console.log(res))
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Tạo tài khoản mới 🔐</Text>

        <TextInput
          label="Số điện thoại"
          value={phone}
          onChangeText={setPhone}
          mode="outlined"
          keyboardType="phone-pad"
          style={styles.input}
        />

        <TextInput label="Tài khoản" value={username} onChangeText={setUsername} mode="outlined" style={styles.input} />
        <TextInput label="Tên người dùng" value={name} onChangeText={setName} mode="outlined" style={styles.input} />

        <TextInput
          label="Mật khẩu"
          value={password}
          onChangeText={setPassword}
          mode="outlined"
          secureTextEntry
          style={styles.input}
        />

        <TextInput label="Địa chỉ" value={address} onChangeText={setAddress} mode="outlined" style={styles.input} />

        <Button mode="contained" onPress={handleRegister} style={styles.button}>
          Đăng ký
        </Button>

        <TouchableOpacity
          onPress={() =>
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              }),
            )
          }>
          <Text style={styles.loginLink}>
            Đã có tài khoản? <Text style={{ color: '#007bff' }}>Đăng nhập</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default RegisterScreen

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
  loginLink: {
    textAlign: 'center',
    marginTop: 24,
    fontSize: 14,
    color: '#555',
  },
})
