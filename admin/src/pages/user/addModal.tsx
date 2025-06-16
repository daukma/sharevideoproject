import { PlusOutlined } from '@ant-design/icons'
import { Button, Col, DatePicker, Form, Input, message, Modal, Row, Upload } from 'antd'
import { useState } from 'react'
import { IUser } from '../../inteface/User.interface'
import { AuthAPI } from '../../apis/Auth.api'

export interface ModalProps {
  open: boolean
  setOpen: (el: boolean) => void
}

const ModalAddUser = ({ open, setOpen }: ModalProps) => {
  const [form] = Form.useForm()
  const [avatarFile, setAvatarFile] = useState(null)

  const handleUploadChange = ({ file }: any) => {
    if (file.status === 'removed') {
      setAvatarFile(null)
    } else {
      setAvatarFile(file)
    }
  }
  const onFinish = async (values: any) => {
    const formData = new FormData()
    formData.append('name', values.name)
    formData.append('username', values.username)
    formData.append('password', values.password)
    if (values.phone) formData.append('phone', values.phone)
    if (values.address) formData.append('address', values.address)
    if (values.dob) formData.append('dob', values.dob.format('DD/MM/YYYY'))

    if (avatarFile) {
      formData.append('image', avatarFile)
    }
    await AuthAPI.register(formData)
      .then((res) => {
        if (res.data.status) {
          message.destroy()
          message.success('Thêm mới thành công!')
          setOpen(false)
          // window.location.reload()
        } else {
          message.destroy()
          message.error('Thêm mới thất bại!')
        }
      })
      .catch((err) => {
        message.destroy()
        message.error(err.response.data.message)
      })
      .finally(() => {
        form.resetFields()
        setOpen(false)
        setAvatarFile(null)
      })
  }
  const onFinishFailed = (error: any) => {
    setOpen(false)
    setAvatarFile(null)
  }

  return (
    <Modal
      title={<span className="flex justify-center text-[20px]">Thêm mới thông tin</span>}
      destroyOnClose={true}
      open={open}
      forceRender={false}
      footer={null}
      onCancel={() => {
        setOpen(false)
        form.resetFields()
        setAvatarFile(null)
      }}
      width={600}>
      <Form layout="vertical" form={form} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
        <Form.Item label="Ảnh đại diện">
          <Upload
            listType="picture-card"
            beforeUpload={() => false} // Không upload ngay
            onChange={handleUploadChange}
            onRemove={() => setAvatarFile(null)}
            maxCount={1}>
            {!avatarFile && (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>
        <Row className="w-full flex justify-between">
          <Col span={11}>
            <Form.Item
              name="username"
              label="Tên đăng nhập"
              rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}>
              <Input placeholder="Nhập tên đăng nhập..." className="w-full" />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item name="password" label="Mật khẩu" rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}>
              <Input placeholder="Nhập mật khẩu..." />
            </Form.Item>
          </Col>
        </Row>
        <Row className="w-full flex justify-between">
          <Col span={11}>
            <Form.Item name="name" label="Tên">
              <Input placeholder="Nhập tên..." />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item name="phone" label="Số điện thoại">
              <Input placeholder="Nhập số điện thoại..." />
            </Form.Item>
          </Col>
        </Row>
        <Row className="w-full flex justify-between">
          <Col span={11}>
            <Form.Item name="address" label="Địa chỉ">
              <Input placeholder="Nhập địa chỉ..." />
            </Form.Item>
          </Col>

          <Col span={11}>
            <Form.Item name="dob" label="Ngày sinh">
              <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>

        <Row className="justify-end">
          <Button
            className="mr-4"
            onClick={() => {
              setOpen(false)
              form.resetFields()
            }}>
            Đóng
          </Button>
          <Button type="primary" htmlType="submit">
            Lưu
          </Button>
        </Row>
      </Form>
    </Modal>
  )
}

export default ModalAddUser
