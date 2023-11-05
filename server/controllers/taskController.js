const path = require('path');

function sendTasks(req, res) {
    res.json({pg: res.locals.pgTasks, mongo: res.locals.mongoTasks})
}

function sendLogin(req, res) {
    return res.sendFile(path.resolve('./build/login/login.html'));
}


module.exports = {
    sendTasks,
    sendLogin
}