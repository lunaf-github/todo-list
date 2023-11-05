const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({ username: String, password: String })

const Task = mongoose.model('task', userSchema);

module.exports = Task;