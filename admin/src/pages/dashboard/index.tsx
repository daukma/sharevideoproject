import { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { DashboardAPI } from '../../apis/Dashboard.api'
import { message } from 'antd'
interface IDashBoard {
  total: string
  monthlyGrowth: any[]
}

export default function Dashboard() {
  const [users, setUsers] = useState<IDashBoard>()
  const [videos, setVideos] = useState<IDashBoard>()

  const fetchData = async () => {
    await DashboardAPI.getUser()
      .then((res) => setUsers(res.data))
      .catch((error) => {
        message.destroy()
        message.error(error.response.data.message)
      })

    await DashboardAPI.getVideo()
      .then((res) => setVideos(res.data))
      .catch((error) => {
        message.destroy()
        message.error(error.response.data.message)
      })
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <h3>Tổng số người dùng: {users?.total}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={users?.monthlyGrowth}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="users" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
      <h3>Tổng số video: {videos?.total}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={videos?.monthlyGrowth}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="videos" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
