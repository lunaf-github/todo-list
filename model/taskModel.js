const mongoose = require('mongoose');


const taskSchema = new mongoose.Schema({ task: String })


// const Schema = mongoose.Schema;

// const taskSchema = new Schema({
//   tasks:{type:Array, required:true}
// });

const Task = mongoose.model('task', taskSchema);

module.exports = Task;