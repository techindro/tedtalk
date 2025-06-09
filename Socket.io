// In server.js (already shown above)
io.on('connection', (socket) => {
  socket.on('joinLive', (room) => socket.join(room));
  socket.on('liveMessage', ({ room, msg }) => io.to(room).emit('liveMessage', msg));
});
