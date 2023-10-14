function sendTasks(req, res) {
    console.log(res.locals)
    res.json(res.locals.tasks)
}


module.exports = {
    sendTasks
}