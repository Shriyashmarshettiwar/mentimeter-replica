module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    socket.on('joinPoll', (pollId) => {
      socket.join(pollId);
      console.log(`Socket ${socket.id} joined poll ${pollId}`);
    });

    socket.on('leavePoll', (pollId) => {
      socket.leave(pollId);
      console.log(`Socket ${socket.id} left poll ${pollId}`);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
};

