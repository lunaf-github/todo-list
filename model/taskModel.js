const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({ task: String })

const Task = mongoose.model('task', taskSchema);

module.exports = Task;