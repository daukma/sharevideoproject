// Login.js
import React, { useState } from 'react'
import { Form, Input, Button, Card, Typography, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { IAuthReq } from '../../inteface/Auth.interface'
import { AuthAPI } from '../../apis/Auth.api'
import { setAuthToken } from '../../helper/authToken.helper'
import { useNavigate } from 'react-router-dom'

const { Title } = Typography

// Styled components
const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`

const LoginCard = styled(Card)`
  width: 100%;
  max-width: 400px;
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  background: rgba(255, 255, 255, 0.95);
`

const Logo = styled.div`
  text-align: center;
  margin-bottom: 24px;
`

const Login = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const onFinish = async (values: IAuthReq) => {
    try {
      setLoading(true)
      await AuthAPI.login(values)
        .then((res) => {
          if (res.data.data.roles === 'admin') {
            message.destroy()
            message.success('Đăng nhập thành công!')
            setAuthToken(res.data.data.accessToken)
            navigate('/dashboard')
          } else {
            message.destroy()
            message.error('Bạn không có quyền truy cập vào trang này!')
          }
        })
        .catch((error) => {
          message.destroy()
          message.error(error.response.data.message)
        })
    } catch (error) {
      message.destroy()
      message.error('Đăng nhập thất bại!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <LoginContainer>
      <LoginCard>
        <Logo>
          <Title level={2} style={{ color: '#1a73e8' }}>
            Đăng Nhập
          </Title>
        </Logo>
        <Form name="login" initialValues={{ remember: true }} onFinish={onFinish}>
          <Form.Item name="username" rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}>
            <Input prefix={<UserOutlined />} placeholder="Tên đăng nhập" size="large" />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" size="large" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={loading}
              style={{
                borderRadius: '5px',
                background: '#1a73e8',
                border: 'none',
              }}>
              Đăng Nhập
            </Button>
          </Form.Item>
        </Form>
      </LoginCard>
    </LoginContainer>
  )
}

export default Login
