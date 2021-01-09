const io = require("socket.io")(3000, {
    cors: {
      origin: "*",
    },
  });
  const users ={}
io.on('connection', socket => {
    socket.on('new-user',name =>{
        users[socket.id] = name
        socket.broadcast.emit('user-connected',name)
    })

    //emit send information from client to server
//    socket.emit('chat-message','Hello word')
    socket.on('send-chat-message',message => {
        socket.broadcast.emit('chat-message',{message: message, name: users[socket.id]})
    })
    io.on('diconnect', () => {
      socket.broadcast.emit('user-disconnected',users[socket.id])
          delete users[socket.id]
        })
})
