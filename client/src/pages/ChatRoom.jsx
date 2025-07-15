import React, { useContext, useState, useEffect } from "react";
import socket from '../socket/socket';
import Message from '../components/Message';
import { UserContext } from '../context/UserContext';

function ChatRoom() {
    const { username, setUsername } = useContext(UserContext);
    const [joined, setJoined] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [typingUser, setTypingUser] = useState('');
    const [onlineUsers, setOnlineUsers] = useState(false);

    useEffect(() => {
        socket.on('receive-message', (msg) => {
            setMessages((prev) => [...prev, msg]);
        });

        socket.on('typing', (user) => {
            setTypingUser(user);
            setTimeout(() =>setTypingUser(''), 2000);
        });

        socket.on('user-list', (users) => {
            setOnlineUsers(users);
        });

        socket.on('notification', (note) => {
            setMessages((prev) => [...prev, { system: true, text: note }]);
        });

        return () => socket.off();
    }, []);

    const joinChat = () => {
        if (username.trim()) {
            socket.emit('join', username);
            setJoined(true);
        }
    };

    const sendMessage = () => {
        if (message.trim()) {
            socket.emit('send-message', { user: username, text: message });
            setMessage('');
        }
    };


    const handleTyping = () => {
        socket.emit('typing', username);
    };

    if (!joined) {
        return (
            <div className="p-10 flex flex-col gap-4">
                <input
                className="p-2 border"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />

                <button className="bg-blue-500 text-white p-2" onClick={joinChat}>
                Join Chat
                </button>
                </div>
        );
    }

    return (
        <div className="p-5">
            <h1 className="text-xl font-bold mb-3">Chat Room</h1>
            <div className="mb-3 text-gray-600 text-sm">Online: {onlineusers.join(', ')}</div>
            <div className="border h-80 overflow-y-auto p-3 mb-3">
                {messages.map((msg, i) => (
                    <Message key={i} msg={msg} />
                ))}
                {typingUser && <p className="text-sm text-blue-500">{typingUser} is typing...</p>}
                </div>
                <div className="flex gap-2">
                    <input
                    className="flex-1 p-2 border"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleTyping}
                    />
                    <button className="bg-green-600 text-white px-4" onClick={sendMessage}>
                        Send
                        </button>
                    </div>
                    </div>
    );
}

export default ChatRoom;