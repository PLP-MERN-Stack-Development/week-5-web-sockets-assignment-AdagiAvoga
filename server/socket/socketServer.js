const { Server } = require('socket.io');
const { handleSocketEvents } = require('../controllers/socketController');

function setupSocket(server) {
    const io = new Server(server, {
        cors: {
            origin: 'http://localhost:5173',
            methods: ['GET', 'POST']
        }
    });

    const onlineUsers = new Map();

    io.on('connection', (socket) => {
        handleSocketEvents(io, socket, onlineUsers);
    });
}

module.exports = { setupSocket };
