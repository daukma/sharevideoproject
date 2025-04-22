import { useEffect } from 'react'
import { AuthAPI } from '../apis/Auth.api'
import { message } from 'antd'

const ProtectedLayout = ({ children }: { children: JSX.Element }) => {
  useEffect(() => {
    const token = localStorage.getItem('accessToken')

    if (token) {
      AuthAPI.getProfile()
        .then((_) => {})
        .catch((_) => {
          message.destroy()
          message.error('Phiên đăng nhập đã hết hạn!')
          localStorage.removeItem('accessToken')
          window.location.replace('/login')
        })
    } else {
      window.location.replace('/login')
    }
  }, [])

  return children
}

export default ProtectedLayout
