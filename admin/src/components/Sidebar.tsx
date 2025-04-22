import { BellFilled, CommentOutlined, DropboxCircleFilled, PieChartOutlined, UserOutlined } from '@ant-design/icons'
import { Layout, Menu, Row } from 'antd'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './index.css'
// import admin from '../assets/images/admin.png';

const { Sider } = Layout

const menuItems = [
  {
    key: '/dashboard',
    icon: <PieChartOutlined />,
    label: 'Dashboard',
  },
  {
    key: '/user',
    icon: <UserOutlined />,
    label: 'Người dùng',
  },
  {
    key: '/video',
    icon: <DropboxCircleFilled />,
    label: 'Video',
  },

  {
    key: '/comment',
    icon: <CommentOutlined />,
    label: 'Bình luận',
  },
  {
    key: '/notification',
    icon: <BellFilled />,
    label: 'Thông báo',
  },
]
export default function SiderbarComponent() {
  const location = useLocation()
  const navigate = useNavigate()
  const [pathName, setPathName] = useState<string>('/')
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    setPathName(location.pathname)
  }, [location.pathname])

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      style={{ height: '100vh', position: 'fixed', zIndex: 1 }}>
      <Row className="items-center cursor-pointer justify-center" style={{ margin: 10 }} onClick={() => navigate('/')}>
        <span className="text-white font-bold cursor-pointer h-10 flex justify-center items-center text-[20px] upppercase">
          Share Video
        </span>
      </Row>
      <Menu
        theme="dark"
        defaultSelectedKeys={[pathName]}
        selectedKeys={[pathName]}
        mode="inline"
        items={menuItems}
        onClick={(info) => navigate(info.key)}
      />
    </Sider>
  )
}
