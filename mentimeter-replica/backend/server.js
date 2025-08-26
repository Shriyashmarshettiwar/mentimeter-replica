const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const connectDB = require('./config/db');
const pollRoutes = require('./routes/polls');
const votesRoutes = require('./routes/votes');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/polls', pollRoutes);
app.use('/api', votesRoutes(io)); // inject io for real-time

require('./socket')(io);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
