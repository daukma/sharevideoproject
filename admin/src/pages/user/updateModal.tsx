import { PlusOutlined } from '@ant-design/icons'
import { Button, Col, DatePicker, Form, Input, message, Modal, Row, Upload } from 'antd'
import { useEffect, useState } from 'react'
import { IUser } from '../../inteface/User.interface'
import { UserAPI } from '../../apis/User.api'
import dayjs from 'dayjs'

export interface ModalProps {
  open: boolean
  setOpen: (el: boolean) => void
  user: IUser | null
  fetchData: () => void
}

const ModalUpdateUser = ({ open, setOpen, user, fetchData }: ModalProps) => {
  const [form] = Form.useForm()
  const [avatarFile, setAvatarFile] = useState<any>(null)

  useEffect(() => {
    if (user && open) {
      form.setFieldsValue({
        name: user.name,
        username: user.username,
        phone: user.phone,
        address: user.address,
        dob: user.dob ? dayjs(user.dob, 'DD/MM/YYYY') : null,
      })

      // Reset avatar preview
      setAvatarFile(null)
    }
  }, [user, open, form])

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
    if (values.phone) formData.append('phone', values.phone)
    if (values.address) formData.append('address', values.address)
    if (values.dob) formData.append('dob', values.dob.format('DD/MM/YYYY'))

    if (avatarFile) {
      formData.append('image', avatarFile.originFileObj || avatarFile)
    }
    console.log(formData)
    try {
      const res = await UserAPI.update(user?._id || '', formData)
      if (res.data.status) {
        message.success('Cập nhật thành công!')
        setOpen(false)
        fetchData() // Tải lại danh sách
      } else {
        message.error('Cập nhật thất bại!')
      }
    } catch (err: any) {
      message.error(err?.response?.data?.message || 'Lỗi không xác định')
    } finally {
      form.resetFields()
      setAvatarFile(null)
    }
  }

  return (
    <Modal
      title={<span className="flex justify-center text-[20px]">Cập nhật người dùng</span>}
      open={open}
      destroyOnClose
      onCancel={() => {
        setOpen(false)
        form.resetFields()
        setAvatarFile(null)
      }}
      footer={null}
      width={600}>
      <Form layout="vertical" form={form} onFinish={onFinish} autoComplete="off">
        <Form.Item label="Ảnh đại diện">
          <Upload
            listType="picture-card"
            beforeUpload={() => false}
            onChange={handleUploadChange}
            onRemove={() => setAvatarFile(null)}
            fileList={avatarFile ? [avatarFile] : []}
            maxCount={1}>
            {!avatarFile && (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="username"
              label="Tên đăng nhập"
              rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}>
              <Input placeholder="Tên đăng nhập" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="name" label="Họ tên">
              <Input placeholder="Họ tên..." />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="phone" label="Số điện thoại">
              <Input placeholder="SĐT..." />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="address" label="Địa chỉ">
              <Input placeholder="Địa chỉ..." />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="dob" label="Ngày sinh">
              <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>

        <Row justify="end">
          <Button
            className="mr-4"
            onClick={() => {
              setOpen(false)
              form.resetFields()
              setAvatarFile(null)
            }}>
            Đóng
          </Button>
          <Button type="primary" htmlType="submit">
            Lưu thay đổi
          </Button>
        </Row>
      </Form>
    </Modal>
  )
}

export default ModalUpdateUser
