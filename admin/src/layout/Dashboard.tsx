/** @format */

import { Layout } from 'antd'
import { ReactNode } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import ProtectedLayout from './ProtectedLayout'

const { Content } = Layout

const DashBoardLayout = ({ children }: { children?: ReactNode | undefined }) => {
  return (
    <ProtectedLayout>
      <Layout style={{ minHeight: '100vh' }}>
        <Sidebar />
        <Layout className="site-layout">
          <Header />
          <Content style={{ marginLeft: 200, marginBottom: 50 }} className="px-6 pt-0 pb-6">
            {children}
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </ProtectedLayout>
  )
}

export default DashBoardLayout
