function Message({ msg }) {
    if (msg.system) {
        return <div className="text-gray-500 italic">{msg.text}</div>;
    }

    return (
        <div>
            <strong>{msg.user}</strong> [{msg.time}]: {msg.text}
        </div>
    );
}

export default Message;