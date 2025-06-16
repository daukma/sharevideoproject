import { Button, Input, message, Pagination, Popconfirm, Row, Table, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { CommentAPI } from '../../apis/Comment.api'
import { IComment } from '../../inteface/Comment.interface'

const { Search } = Input

export default function Comments() {
  const [dataComment, setDateComment] = useState<any>([])
  const [total, setTotal] = useState(0)
  const [current, setCurrent] = useState(1)
  const pageSize = 10

  useEffect(() => {
    fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current])
  const deleteComment = async (id: string) => {
    await CommentAPI.delete(id).then((res) => {
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
    await CommentAPI.fetchAll({ search: data, page: current, limit: pageSize })
      .then((res) => {
        setDateComment(res.data.data)
        message.destroy()
        message.success('Lấy danh sách thành công!')
        setTotal(res.data.metaData.total)
      })
      .catch((err) => {
        message.destroy()
        message.error(err.response.data.message)
        setDateComment([])
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
      render: (_: null, record: IComment) => (
        <div style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>{record.userId.username}</div>
      ),
    },
    {
      title: 'Video',
      key: 'videoid',
      dataIndex: 'videoid',
      render: (_: null, record: IComment) => (
        <div style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>{record.videoId?._id}</div>
      ),
    },
    {
      title: 'Trả lời cho',
      key: 'reptoid',
      dataIndex: 'reptoid',
      render: (_: null, record: IComment) => (
        <div style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>{record.reptoId?._id}</div>
      ),
    },
    {
      title: 'Nội dung',
      key: 'content',
      dataIndex: 'content',
      render: (_: null, record: IComment) => (
        <div style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>{record.content}</div>
      ),
    },

    {
      title: 'Thao tác',
      key: 'action',
      render: (_: null, record: any) => {
        return (
          <Row className="flex ">
            <Popconfirm
              title="Bạn có chắc chắn muốn xóa người dùng này không?"
              okText="Xóa"
              cancelText="Hủy"
              onConfirm={() => {
                deleteComment(record._id)
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
        Danh sách Comment
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
      </Row>

      <Table columns={columns} dataSource={dataComment} bordered rowKey="_id" pagination={false} tableLayout="auto" />
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
