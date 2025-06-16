import { Button, Form, Input, message, Modal, Row } from 'antd'
import { NotificationAPI } from '../../apis/Notification.api'
import { INotification } from '../../inteface/Notification.inteface'
import { useEffect } from 'react'

export interface ModalProps {
  open: boolean
  setOpen: (el: boolean) => void
  notificationData: INotification | null // Dữ liệu thông báo cần sửa
}

const ModalEdit = ({ open, setOpen, notificationData }: ModalProps) => {
  const [form] = Form.useForm()

  // Khi modal mở, điền dữ liệu của thông báo vào form
  useEffect(() => {
    if (open && notificationData) {
      form.setFieldsValue({
        message: notificationData.message,
        notificationType: notificationData.notificationType,
        useToId: notificationData.useToId || '',
        videoId: notificationData.videoId || '',
        commentId: notificationData.commentId || '',
      })
    }
  }, [open, notificationData])

  const onFinish = async (values: INotification) => {
    await NotificationAPI.update(notificationData?._id!, values) // Gọi API để cập nhật thông báo
      .then((res) => {
        if (res.data.status) {
          message.destroy()
          message.success('Cập nhật thông báo thành công!')
          setOpen(false)
          window.location.reload() // Hoặc load lại dữ liệu ở chỗ bạn cần
        } else {
          message.destroy()
          message.error('Cập nhật thất bại!')
        }
      })
      .catch((err) => {
        message.destroy()
        message.error(err.response.data.message)
      })
      .finally(() => {
        form.resetFields()
        setOpen(false)
      })
  }

  const onFinishFailed = (error: any) => {
    setOpen(false)
  }

  return (
    <Modal
      title={<span className="flex justify-center text-[20px]">Sửa thông báo</span>}
      destroyOnClose={true}
      open={open}
      forceRender={false}
      footer={null}
      onCancel={() => {
        setOpen(false)
        form.resetFields()
      }}
      width={600}>
      <Form layout="vertical" form={form} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
        <Form.Item
          name="message"
          label="Nhập nội dung"
          rules={[{ required: true, message: 'Vui lòng nhập thông báo!' }]}>
          <Input.TextArea placeholder="Nhập nội dung..." className="w-full" />
        </Form.Item>

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

export default ModalEdit
