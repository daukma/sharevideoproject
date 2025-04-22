import { CopyrightOutlined } from '@ant-design/icons'
import { Layout, Row, Typography } from 'antd'
const { Link } = Typography
const { Footer } = Layout
export default function FooterComponent() {
  return (
    <Footer
      style={{ height: 50, position: 'fixed', bottom: 0, right: 0, left: 0 }}
      className="bg-slate-300 text-center flex justify-center items-center">
      <Row>
        Copyright <CopyrightOutlined className="ml-1 mr-1" /> 2025 by
        <Link href="" target="_blank" className="ml-1">
          Đỗ Thanh Bình
        </Link>
      </Row>
    </Footer>
  )
}
