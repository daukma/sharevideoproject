import { Button, Form, Input, message, Modal, Row } from 'antd'
import { AuthAPI } from '../../apis/Auth.api'
import { NotificationAPI } from '../../apis/Notification.api'
import { INotification } from '../../inteface/Notification.inteface'

export interface ModalProps {
  open: boolean
  setOpen: (el: boolean) => void
}

const ModalAdd = ({ open, setOpen }: ModalProps) => {
  const [form] = Form.useForm()
  const onFinish = async (values: INotification) => {
    await AuthAPI.getProfile()
      .then((res) => {
        values.userId = res.data.data.user._id
      })
      .catch((err) => {
        message.destroy()
        message.error(err.response.data.message)
      })
    await NotificationAPI.create(values)
      .then((res) => {
        if (res.data.status) {
          message.destroy()
          message.success('Thêm mới thành công!')
          setOpen(false)
          window.location.reload()
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
      })
  }
  const onFinishFailed = (error: any) => {
    setOpen(false)
  }

  return (
    <Modal
      title={<span className="flex justify-center text-[20px]">Thêm thông báo</span>}
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

export default ModalAdd
