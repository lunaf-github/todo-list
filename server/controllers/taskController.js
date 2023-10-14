function sendTasks(req, res) {
    console.log(res.locals.tasks)
    res.json(res.locals.tasks)
}


module.exports = {
    sendTasks
}