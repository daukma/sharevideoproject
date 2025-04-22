// Register.js
import React, { useState } from 'react'
import { Form, Input, Button, Card, Typography, message } from 'antd'
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons'
import styled from 'styled-components'

const { Title } = Typography

// Styled components
const RegisterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`

const RegisterCard = styled(Card)`
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

const Register = () => {
  const [loading, setLoading] = useState(false)

  const onFinish = (values: any) => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      message.destroy()
      message.success('Đăng ký thành công!')
      console.log('Received values:', values)
    }, 1000)
  }

  return (
    <RegisterContainer>
      <RegisterCard>
        <Logo>
          <Title level={2} style={{ color: '#1a73e8' }}>
            Đăng Ký
          </Title>
        </Logo>
        <Form name="register" initialValues={{ remember: true }} onFinish={onFinish}>
          <Form.Item name="username" rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}>
            <Input prefix={<UserOutlined />} placeholder="Tên đăng nhập" size="large" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Vui lòng nhập email!' },
              { type: 'email', message: 'Email không hợp lệ!' },
            ]}>
            <Input prefix={<MailOutlined />} placeholder="Email" size="large" />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" size="large" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('Mật khẩu không khớp!'))
                },
              }),
            ]}>
            <Input.Password prefix={<LockOutlined />} placeholder="Xác nhận mật khẩu" size="large" />
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
              Đăng Ký
            </Button>
          </Form.Item>
        </Form>
      </RegisterCard>
    </RegisterContainer>
  )
}

export default Register
