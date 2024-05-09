
const express = require('express'),
    app = express(),
    { createServer } = require('http'),
    { Server } = require('socket.io'),
    cross = require('cors');

app.use(cross());

const server = createServer(app);
const io = new Server(server, { cors: { origin: '*', methods: '* ' } })

const rooms = [
    'roomNum : new Array(size*size).fill(null)'
]

io.on('connection', (socket) => {
    socket.on('create-room', (roomNum) => {
        socket.join(roomNum)
        if (!rooms.includes(roomNum)) {
            rooms.push(roomNum)
        }
        socket.emit('room-status', `Success join to room: ${roomNum}, members : ${io.sockets.adapter.rooms.get(roomNum).size}`)
    })
    console.log("connected", socket.id);
})





server.listen(3000, () => console.log('@@@@@@@ server is listening on port 3000 @@@@@@'))