const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const socketIo = require('socket.io');
require('dotenv').config();

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const jobRoutes = require('./routes/job');
const quizRoutes = require('./routes/quiz');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*' } });

mongoose.connect(process.env.MONGO_URI);

app.use(cors());
app.use(express.json());
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/job', jobRoutes);
app.use('/api/quiz', quizRoutes);

// Real-time chat/live events (Socket.io)
io.on('connection', (socket) => {
  socket.on('joinLive', (room) => socket.join(room));
  socket.on('liveMessage', ({ room, msg }) => io.to(room).emit('liveMessage', msg));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log('Server running on', PORT));
