const Task = require('../model/mongoModel.js');


const getTasks = function(req, res) {
  // const query = `SELECT * FROM ${table}`;

  // try {
  //   const result = await db.query(query);
  //   res.locals.pgTasks = result.rows;
  //   next();
  // } catch(err) {
  //   next({
  //     log: `Unable to retrieve tasks from database, postgreMiddleware.getAllTasks, Error: ${err}`,
  //     status: 404,
  //     message: 'Unable to retrieve tasks'
  //   });
  // }
}

const addTask = async function(req, res, next) {
  const {task} = req.body;
  const taskDoc = new Task({task});

  try {
    await taskDoc.save();
    res.locals.mongoTasks = task;
    next();
  } catch(err) {
    next({
      log: `Unable to add tasks to database, mongoMiddleware.addTask, Error: ${err}`,
      status: 500,
      message: 'Unable to add task'
    });
  }
}

const updateTask = function(req, res) {

}

const deleteTask = function (req, res) {g

}


module.exports = {
  getTasks,
  addTask,
  updateTask,
  deleteTask
};