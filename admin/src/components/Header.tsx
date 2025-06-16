import { DownOutlined, LogoutOutlined } from '@ant-design/icons'
import { Avatar, Dropdown, Layout, MenuProps, message, Row, Space, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import './index.css'
import { removeAuthToken } from '../helper/authToken.helper'
import { AuthAPI } from '../apis/Auth.api'
import { useEffect, useState } from 'react'
import { IUser } from '../inteface/User.interface'
import { AppConfig } from '../AppConfig'

const { Text } = Typography

const { Header } = Layout
export default function HeaderComponent() {
  const navigate = useNavigate()
  const [profile, setProfile] = useState<IUser>()

  const getProfile = async () => {
    try {
      await AuthAPI.getProfile().then((res) => {
        if (res.data.status) {
          setProfile(res.data.data.user)
        } else {
          message.destroy()
          message.error(res.data.message)
        }
      })
    } catch (error) {
      message.destroy()
      message.error('Lỗi hệ thống!')
    }
  }

  useEffect(() => {
    getProfile()
  }, [])

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Text
          className="text-black"
          onClick={() => {
            removeAuthToken()
            message.destroy()
            message.success('Đăng xuất thành công!')
            navigate('/login')
          }}>
          {<LogoutOutlined style={{ marginRight: 4 }} />}
          Đăng xuất
        </Text>
      ),
    },
  ]
  return (
    <Header>
      <Row className="h-full justify-end items-center text-white">
        <Dropdown menu={{ items }}>
          <Space>
            <Avatar src={'http://localhost:3888/videos/' + profile?.profile} size="large" />
            <span>Chào mừng,{profile?.username}</span>
            <DownOutlined style={{ color: 'white', marginLeft: '10px' }} />
          </Space>
        </Dropdown>
      </Row>
    </Header>
  )
}
