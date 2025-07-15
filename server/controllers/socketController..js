const { formatMessage } = require('../utils/formatMessage');

function handleSocketEvents(io, socket, onlineUsers) {
    console.log('Connected:', socket.id);

    socket.on('join', (username) => {
        onlineUsers.set(socket.id, username);
        io.emit('user-list', Array.from(onlineUsers.values()));
        socket.broadcast.emit('notification', `${username} joined the chat`);
    });

    socket.on('send-message', (message) => {
        const formatted = formatMessage(message.user, message.text);
        io.emit('receive-message', formatted);
    });

    socket.on('typing', (username) => {
        socket.broadcast.emit('typing', username);
    });

    socket.on('disconnect', () => {
        const username = onlineUsers.get(socket.id);
        onlineUsers.delete(socket.id);
        io.emit('user-list', Array.from(onlineUsers.values()));
        if (username) {
            io.emit('notification', `${username} left the chat`);
        }
        console.log('Disconnected:', socket.id);
    });
}

module.exports = { handleSocketEvents };