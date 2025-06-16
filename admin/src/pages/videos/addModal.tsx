import React, { useState } from 'react'
import { Button, Col, Form, Input, Modal, Row, message, Select } from 'antd'
import { VideoAPI } from '../../apis/Video.api'

const { Option } = Select

interface ModalAddVideoProps {
  open: boolean
  setOpen: (open: boolean) => void
  fetchVideos: () => void // Hàm để cập nhật danh sách video sau khi thêm
}

const ModalAddVideo = ({ open, setOpen, fetchVideos }: ModalAddVideoProps) => {
  const [form] = Form.useForm()
  const [file, setFile] = useState<any>(null) // Thêm trạng thái để lưu file video

  // Hàm xử lý khi file thay đổi
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null
    if (file) {
      setFile(file)
    }
  }

  const onFinish = async (values: any) => {
    if (!file) {
      message.error('Vui lòng chọn video')
      return
    }

    const formData = new FormData()
    formData.append('title', values.title)
    formData.append('description', values.description)
    formData.append('public', values.public)

    // Thêm file video vào FormData
    formData.append('video', file)

    try {
      const response = await VideoAPI.create(formData) // API để thêm video mới
      if (response.status) {
        message.success('Thêm video thành công!')
        setOpen(false)
        fetchVideos() // Cập nhật danh sách video sau khi thêm
        form.resetFields()
        setFile(null)
      } else {
        message.error('Thêm video thất bại!')
      }
    } catch (error: any) {
      message.error(error.response?.data?.message || 'Lỗi không xác định')
    }
  }

  return (
    <Modal
      title="Thêm mới video"
      open={open}
      onCancel={() => {
        setOpen(false)
        form.resetFields()
        setFile(null)
      }}
      footer={null}
      width={600}>
      <Form form={form} onFinish={onFinish} layout="vertical" autoComplete="off">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="title"
              label="Tiêu đề"
              rules={[{ required: true, message: 'Vui lòng nhập tiêu đề video' }]}>
              <Input placeholder="Tiêu đề video" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="description"
              label="Mô tả"
              rules={[{ required: true, message: 'Vui lòng nhập mô tả video' }]}>
              <Input placeholder="Mô tả video" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="video" label="Video" rules={[{ required: true, message: 'Vui lòng chọn file video' }]}>
              <input type="file" accept="video/*" onChange={handleFileChange} style={{ display: 'block' }} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="public" label="Chế độ" rules={[{ required: true, message: 'Vui lòng chọn chế độ' }]}>
              <Select placeholder="Chế độ">
                <Option value="public">Công khai</Option>
                <Option value="private">Riêng tư</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="hashtags" label="Hashtags">
              <Input placeholder="Hashtags" />
            </Form.Item>
          </Col>
        </Row>

        <Row justify="end">
          <Button
            onClick={() => {
              setOpen(false)
              form.resetFields()
              setFile(null)
            }}>
            Đóng
          </Button>
          <Button type="primary" htmlType="submit" className="ml-2">
            Thêm video
          </Button>
        </Row>
      </Form>
    </Modal>
  )
}

export default ModalAddVideo
