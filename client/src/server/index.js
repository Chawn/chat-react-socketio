const express = require('express')
const app = express()
const server = require('http').createServer(app)

const io = require('socket.io')(server)

const port = process.env.port || 8080;

app.use(express.static(__dirname + '../../build'));
app.get('/', (req, res, next) => res.sendFile(__dirname + './index.html'));

// const cors = require('cors')
// const { Server } = require('socket.io')
// app.use(cors())
// const io = new Server(httpServer, {
//   cors: {
//     origin: 'https://61a2401fbd438936ffc88c7f--chawput-chat-react-socketio.netlify.app/',
//     // origin: 'http://localhost:3000',
//     methods: ['GET', 'POST'],
//   }
// })

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

server.listen(port, () => {
  console.log('SERVER RUNNING')
})