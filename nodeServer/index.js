//node server for connection with socket io
const io = require("socket.io")(8000);
const users = {};
io.on("connection", (socket) => {
  socket.on('new-user-joined', (data) => {
    users[socket.id] = data;
    socket.broadcast.emit('user-joined', data);
  });
  socket.on("send", (message) => {
    socket.broadcast.emit('received', {
      message: message,
      name: users[socket.id]
    });
  });
  socket.on("disconnect", (message) => {
    socket.broadcast.emit('left', users[socket.id]);
    delete users[socket.id]
  });
});
