const db = require('../../model/postgreModel');
const table = process.env.PG_TABLE_NAME;

// Creating table. 
// Make sure to use double quotes for the column names. 
// EX. 
// CREATE TABLE example (
//   "_id" SERIAL PRIMARY KEY,
//   "task" varChar(255) NOT NULL
//  )
  


// Sytax
// Make sure to use single quotes, double quotes does not work


// Create
// The INTO is optional, but is best practice to use becuse some RDBMS require it and it makes
// your query much more potable. Also, it is more readable because you are adding a row into the table,
// not adding a table into a table

// RETURNING * , its a query that tells the database to return the new data that was added. That way, you can 
// send it back to the user as a response if needed. 

const addTask = async function(req, res, next) {
  const { task } = req.body;
  const query =  `INSERT INTO ${table} (task) VALUES ('${task}') RETURNING *`

  try {
    const result = await db.query(query);
    res.locals.tasks = result.rows;
    next();
  } catch(err) {
    next({
      log: `Unable to add tasks from database, postgreMiddleware.addTask, Error: ${err}`,
      status: 500,
      message: 'Unable to add task'
    });
  }

}

// Read
const getTasks = async function(req, res, next) {
  const query = `SELECT * FROM ${table}`;

  try {
    const result = await db.query(query);
    res.locals.tasks = result.rows;
    next();
  } catch(err) {
    next({
      log: `Unable to retrieve tasks from database, postgreMiddleware.getAllTasks, Error: ${err}`,
      status: 404,
      message: 'Unable to retrieve tasks'
    });
  }
}


// Update
const updateTask = function(req, res, next) {

}


// Delete
const deleteTask = function (req, res, next) {

}

module.exports = {
  getTasks,
  addTask,
  updateTask,
  deleteTask
};