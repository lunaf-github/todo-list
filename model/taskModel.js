const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  tasks:{type:Array, required:true}
});

const Tasks = mongoose.model('tasks',taskSchema);