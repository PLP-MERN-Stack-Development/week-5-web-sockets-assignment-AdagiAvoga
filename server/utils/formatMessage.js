function formatMessage(user, text) {
    return {
        user,
        text,
        time: new Date().toLocaleTimeString()
    };
}

module.exports = { formatMessage };