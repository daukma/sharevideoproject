import { Button, Input, message, Pagination, Popconfirm, Row, Table, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { VideoAPI } from '../../apis/Video.api'
import { IVideo } from '../../inteface/Video.interface'

const { Search } = Input

export default function Videos() {
  const [dataVideo, setDateVideo] = useState<any>([])
  const [total, setTotal] = useState(0)
  const [current, setCurrent] = useState(1)
  const pageSize = 10

  useEffect(() => {
    fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetch = async (data?: string) => {
    await VideoAPI.fetchAll({ search: data, page: current, limit: pageSize })
      .then((res) => {
        setDateVideo(res.data.data)
        message.destroy()
        message.success('Lấy danh sách thành công!')
        setTotal(res.data.metaData.total)
      })
      .catch((err) => {
        message.destroy()
        message.error(err.response.data.message)
        setDateVideo([])
      })
  }
  const deleteVideo = async (id: string) => {
    await VideoAPI.delete(id).then((res) => {
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
      render: (_: null, record: IVideo) => (
        <div style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>{record.userId.username}</div>
      ),
    },
    {
      title: 'Tiêu đề',
      key: 'title',
      dataIndex: 'title',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
    },

    {
      title: 'hashTag',
      dataIndex: 'hastags',
      key: 'hastags',
    },
    {
      title: 'Thumbnail',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
    },
    {
      title: 'Đường dẫn',
      dataIndex: 'videoUrl',
      key: 'videoUrl',
      width: '20%',
      render: (_: null, record: IVideo) => (
        <div style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>{record.videoUrl}</div>
      ),
    },
    {
      title: 'Public',
      dataIndex: 'public',
      key: 'public',
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
                deleteVideo(record._id)
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
        Danh sách Video
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

      <Table columns={columns} dataSource={dataVideo} bordered rowKey="_id" pagination={false} tableLayout="auto" />
      <Pagination
        current={current}
        total={total}
        showTotal={(total) => `Tổng ${total} videos`}
        pageSize={pageSize}
        onChange={(page: number) => {
          setCurrent(page)
        }} // Cập nhật trang khi người dùng thay đổi
        style={{ marginTop: 20 }}
      />
    </>
  )
}
