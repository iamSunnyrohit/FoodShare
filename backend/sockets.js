const jwt = require('jsonwebtoken');

module.exports = function attachSockets(io) {
  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth && socket.handshake.auth.token;
      if (!token) return next(new Error('auth required'));
      socket.user = jwt.verify(token, process.env.JWT_SECRET);
      next();
    } catch {
      next(new Error('invalid token'));
    }
  });

  io.on('connection', (socket) => {
    socket.join('listings');
    socket.join(`user:${socket.user.id}`);

    socket.on('track', (id) => {
      if (typeof id === 'string' && /^[a-f\d]{24}$/i.test(id)) socket.join(`listing:${id}`);
    });
    socket.on('untrack', (id) => {
      if (typeof id === 'string') socket.leave(`listing:${id}`);
    });
  });
};
