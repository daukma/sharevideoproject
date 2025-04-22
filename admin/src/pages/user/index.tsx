import { PlusOutlined } from '@ant-design/icons'
import { Button, message, Row, Table, Typography, Input, Popconfirm, Pagination } from 'antd'
import { useEffect, useState } from 'react'
import { UserAPI } from '../../apis/User.api'
import { IUser } from '../../inteface/User.interface'

import ModalAddUser from './addModal'

const { Search } = Input

export default function User() {
  const [dataUser, setDateUser] = useState<any>([])
  const [open, setOpen] = useState(false)
  const [total, setTotal] = useState(0)
  const [current, setCurrent] = useState(1)
  const pageSize = 10

  useEffect(() => {
    fectch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current])

  const fectch = async (data?: string) => {
    await UserAPI.fetchAll({ search: data, page: current, limit: pageSize })
      .then((res) => {
        setDateUser(res.data.data)
        message.destroy()
        message.success('Lấy danh sách thành công!')
        setTotal(res.data.metaData.total)
      })
      .catch((err) => {
        message.destroy()
        message.error(err.response.data.message)
        setDateUser([])
      })
  }

  const deleteUser = async (id: string) => {
    await UserAPI.deleteUser(id).then((res) => {
      if (res.data.status) {
        message.destroy()
        message.success('Xóa thành công!')
        fectch()
      } else {
        message.destroy()
        message.error('Xóa thất bại!')
      }
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
      title: 'Tài khoản',
      key: 'username',
      dataIndex: 'username',
    },
    {
      title: 'Mật khẩu',
      key: 'password',
      dataIndex: 'password',
    },
    {
      title: 'Họ tên',
      dataIndex: 'name',
      key: 'name',
    },

    {
      title: 'SĐT',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'dob',
      key: 'dob',
    },
    {
      title: 'Profile',
      dataIndex: 'profile',
      key: 'profile',
      width: '20%',
      render: (_: null, record: IUser) => (
        <div style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>{record.profile}</div>
      ),
    },
    {
      title: 'Vai trò',
      dataIndex: 'roles',
      key: 'roles',
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
              onConfirm={() => deleteUser(record._id)}>
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
        Danh sách tài khoản
      </Typography.Title>
      <Row className="mb-4 flex justify-between">
        <Row>
          <Search
            placeholder="Tìm theo tên hoặc username"
            onSearch={(values) => {
              fectch(values)
            }}
            enterButton
            allowClear
            style={{ width: 400, marginBottom: 16 }}
          />
        </Row>
        <Button type="primary" icon={<PlusOutlined />} className="mr-4" onClick={() => setOpen(true)}>
          Thêm tài khoản
        </Button>
        <ModalAddUser open={open} setOpen={setOpen} />
      </Row>

      <Table columns={columns} dataSource={dataUser} bordered rowKey="_id" pagination={false} tableLayout="auto" />
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
