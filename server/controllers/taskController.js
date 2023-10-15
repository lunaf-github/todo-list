function sendTasks(req, res) {
    res.json({pg: res.locals.pgTasks, mongo: res.locals.mongoTasks})
}


module.exports = {
    sendTasks
}