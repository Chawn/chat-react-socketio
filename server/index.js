const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors')
const { Server } = require('socket.io')
app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  }
})

io.on('connection', (socket) => {
  console.log(`a user connected: ${socket.id}`)
  socket.on("join_room", (room) => {
    socket.join(room);
    console.log(`user ${socket.id} joined room ${room}`)
  })
  socket.on('send_message', (messageData) => {
    console.log(messageData)
    socket.to(messageData.room).emit("recieve_message", messageData);

  })
  socket.on('disconnect', () => {
    console.log(`user disconnected: ${socket.id}`)
  })
})

server.listen(3001, () => {
  console.log('SERVER RUNNING')
})