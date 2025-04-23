import { PlusOutlined } from '@ant-design/icons'
import { Button, message, Row, Table, Typography, Input, Popconfirm, Pagination } from 'antd'
import { useEffect, useState } from 'react'
import { NotificationAPI } from '../../apis/Notification.api'
import { INotification } from '../../inteface/Notification.inteface'
import ModalAdd from './addModal'

const { Search } = Input

export default function Notifications() {
  const [dataNotification, setDateNotification] = useState<any>([])
  const [open, setOpen] = useState(false)
  const [total, setTotal] = useState(0)
  const [current, setCurrent] = useState(1)
  const pageSize = 10

  useEffect(() => {
    fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current])

  const deleteNoti = async (id: string) => {
    await NotificationAPI.delete(id).then((res) => {
      if (res.data.status) {
        message.destroy()
        message.success('Xóa thành công!')
        fetch()
      } else {
        message.destroy()
        message.error('Xóa thất bại!')
      }
    })
  }

  const fetch = async (data?: string) => {
    await NotificationAPI.fetchAll({ search: data, page: current, limit: pageSize })
      .then((res) => {
        setDateNotification(res.data.data)
        message.destroy()
        message.success('Lấy danh sách thành công!')
        setTotal(res.data.metaData.total)
      })
      .catch((err) => {
        message.destroy()
        message.error(err.response.data.message)
        setDateNotification([])
      })
  }

  const columns = [
    {
      title: 'STT',
      key: 'index',
      width: '5%',
      render: (_: null, __: any, index: number) => {
        return <Typography.Title level={5}>{index + 1}</Typography.Title>
      },
    },
    {
      title: 'Người đăng',
      key: 'userid',
      dataIndex: 'userid',
      render: (_: null, record: INotification) => (
        <div style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>{record.userId.username}</div>
      ),
    },
    {
      title: 'Nội dung',
      key: 'message',
      dataIndex: 'message',
      render: (_: null, record: INotification) => (
        <div style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>{record.message}</div>
      ),
    },
    {
      title: 'Loại thông báo',
      key: 'notificationType',
      dataIndex: 'notificationType',
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: null, record: any) => {
        return (
          <Row className="flex ">
            <Button type="primary" className="mr-2" onClick={() => () => {}}>
              Sửa
            </Button>
            <Popconfirm
              title="Bạn có chắc chắn muốn xóa người dùng này không?"
              okText="Xóa"
              cancelText="Hủy"
              onConfirm={() => {
                deleteNoti(record._id)
              }}>
              <Button type="primary" danger>
                Xóa
              </Button>
            </Popconfirm>
          </Row>
        )
      },
    },
  ]
  return (
    <>
      <Typography.Title level={3} className="mb-4 uppercase font-bold">
        Danh sách Notification
      </Typography.Title>
      <Row className="mb-4 flex justify-between">
        <Row>
          <Search
            placeholder="Tìm theo tiêu đề"
            onSearch={(values) => {
              fetch(values)
            }}
            enterButton
            allowClear
            style={{ width: 400, marginBottom: 16 }}
          />
        </Row>
        <Button type="primary" icon={<PlusOutlined />} className="mr-4" onClick={() => setOpen(true)}>
          Thêm Thông báo
        </Button>
        <ModalAdd open={open} setOpen={setOpen} />
      </Row>

      <Table
        columns={columns}
        dataSource={dataNotification}
        bordered
        rowKey="_id"
        pagination={false}
        tableLayout="auto"
      />
      <Pagination
        current={current}
        total={total}
        showTotal={(total) => `Tổng ${total} tài khoản`}
        pageSize={pageSize}
        onChange={(page: number) => {
          setCurrent(page)
        }} // Cập nhật trang khi người dùng thay đổi
        style={{ marginTop: 20 }}
      />
    </>
  )
}
