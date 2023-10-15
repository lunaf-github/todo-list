const db = require('../config/postgreConnect');
const table = process.env.PG_TABLE_NAME;

// Creating table. 
// At first I though I need to add double qoutes for the column names.
// Turns out I inserting a row with the wrong syntax, I neded to use
// single quotes for the insert query values. 
// EX. 
  // CREATE TABLE example (
  //   _id SERIAL PRIMARY KEY,
  //   task varChar(255) NOT NULL
  // )
  

// We have different options for grabing information for our queries, 
// I am not sure what cases they are recomended to use or not use.
  // 1. We can use a payload,  the req.body
  // 2. We can use path variables,  the req.params
  // 3. We can get query variables, the req.query

// Sytax
// Make sure to use single quotes for strings, double quotes does not work (exeption: CREATE TABLE)


// ***************************************  Create   ************************************************************
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
    res.locals.pgTasks = result.rows;
    next();
  } catch(err) {
    next({
      log: `Unable to add tasks to database, postgreMiddleware.addTask, Error: ${err}`,
      status: 500,
      message: 'Unable to add task'
    });
  }

}

// ***************************************  Read   ************************************************************
const getTasks = async function(req, res, next) {
  const query = `SELECT * FROM ${table}`;

  try {
    const result = await db.query(query);
    res.locals.pgTasks = result.rows;
    next();
  } catch(err) {
    next({
      log: `Unable to retrieve tasks from database, postgreMiddleware.getAllTasks, Error: ${err}`,
      status: 404,
      message: 'Unable to retrieve tasks'
    });
  }
}

// ***************************************  Update   ************************************************************

// Make sure to use single quotes for strings 

const updateTask = async function(req, res, next) {
  const { id, task: newValue} = req.body;
  const query =  `UPDATE ${table} SET task='${newValue}' WHERE _id = ${id}`;
  
  try {
    await db.query(query);
    res.locals.pgTasks = `Task updated`;
    next();
  } catch(err) {
    next({
      log: `Unable to update tasks in database, postgreMiddleware.updateTask, Error: ${err}`,
      status: 404,
      message: 'Unable to update task'
    });
  }
}

// ***************************************  Delete   ************************************************************


const deleteTask = async function (req, res, next) {
  const { id } = req.body;
  const query =  `DELETE FROM ${table} WHERE _id = ${id}`;
  
  try {
    await db.query(query);
    console.log(result)
    res.locals.pgTasks = `Task Deleted`;
    next();
  } catch(err) {
    next({
      log: `Unable to delete tasks in database, postgreMiddleware.deleteTask, Error: ${err}`,
      status: 404,
      message: 'Unable to delete task'
    });
  }
}

module.exports = {
  getTasks,
  addTask,
  updateTask,
  deleteTask
};