import { Button, Input, message, Pagination, Popconfirm, Row, Table, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { VideoAPI } from '../../apis/Video.api'
import { IVideo } from '../../inteface/Video.interface'
import ModalAddVideo from './addModal' // Import ModalAddVideo

const { Search } = Input

export default function Videos() {
  const [dataVideo, setDataVideo] = useState<any>([])
  const [total, setTotal] = useState(0)
  const [current, setCurrent] = useState(1)
  const [openModal, setOpenModal] = useState(false) // Thêm state để mở Modal
  const pageSize = 10

  useEffect(() => {
    fetchVideos()
  }, [current])

  const fetchVideos = async (data?: string) => {
    await VideoAPI.fetchAll({ search: data, page: current, limit: pageSize })
      .then((res) => {
        setDataVideo(res.data.data)
        setTotal(res.data.metaData.total)
        message.destroy()
        message.success('Lấy danh sách thành công!')
      })
      .catch((err) => {
        message.destroy()
        message.error(err.response.data.message)
        setDataVideo([])
        setTotal(0)
      })
  }

  const deleteVideo = async (id: string) => {
    await VideoAPI.delete(id).then((res) => {
      if (res.data.status) {
        message.destroy()
        message.success('Xóa thành công!')
        fetchVideos()
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
      title: 'Hashtags',
      dataIndex: 'hastags',
      key: 'hastags',
    },
    {
      title: 'Video URL',
      dataIndex: 'videoUrl',
      key: 'videoUrl',
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
          <Row className="flex">
            <Popconfirm
              title="Bạn có chắc chắn muốn xóa video này không?"
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
              fetchVideos(values)
            }}
            enterButton
            allowClear
            style={{ width: 400, marginBottom: 16 }}
          />
        </Row>
        <Button type="primary" onClick={() => setOpenModal(true)} style={{ marginBottom: 16 }}>
          Thêm Video
        </Button>
      </Row>

      <Table columns={columns} dataSource={dataVideo} bordered rowKey="_id" pagination={false} tableLayout="auto" />
      <Pagination
        current={current}
        total={total}
        showTotal={(total) => `Tổng ${total} video`}
        pageSize={pageSize}
        onChange={(page: number) => setCurrent(page)}
        style={{ marginTop: 20 }}
      />

      {/* Modal thêm video */}
      <ModalAddVideo open={openModal} setOpen={setOpenModal} fetchVideos={fetchVideos} />
    </>
  )
}
