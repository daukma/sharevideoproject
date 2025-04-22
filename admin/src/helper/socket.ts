import { io, Socket } from 'socket.io-client'

const socket: Socket = io('http://localhost:3000') // hoặc domain backend của bạn

export default socket
