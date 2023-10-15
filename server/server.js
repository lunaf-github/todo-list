// **************************************************** Configuration *************************************************************************
// Importing and instantiating express application
// Dependency: 'express'
const express = require('express');
const app = express();

// Node.js Built-in module
// Dependency: Not install required
const path = require('path');

// cookie parser receives cookies from clients and makes them accessible to req.cookies. 
const cookieParser = require('cookie-parser')

// This is for creating session cookies. This module doesn't need cookie parser, it can parse cookies now. 
const session = require('express-session')

// Package used to create custom environmental variables, make sure to import this module before using custom environmental variables
// Need to create a .env file to add custom variables
// Dependencies: dotenv
require('dotenv').config();

// Defining port, it is best practice to create a custom environment variable. 
// Add a fallback port just in case the environmental varible is not provided
const PORT = process.env.PORT || 3000;

// Import mongoose ORM
const mongoose = require('mongoose');

// ************************************************** Database Models ***********************************************************************
const db = require('../model/postgreModel.js');  // potgres database pool
const Task = require('../model/mongoModel.js');  // mongoDB Schema

// **************************************************** Import Controllers and middleware ***************************************************************
// const tutorialController = require('./controllers/tutorialControllers.js');
const taskController = require('./controllers/taskController.js');
const postgreMiddleware = require('./middleware/postgreMiddleware.js');
const mongoMiddleware = require('./middleware/mongoMiddleware.js');

// **************************************************** Use Middlewares *************************************************************************
// if the requested URI is the root, the express.static() middleware acts as an endpoint and will send the static files. 
// The request does not move to other middlewares because there is no next() implemented within the static() method. 
app.use(express.static(path.join(__dirname, '../build'))); 

// This middleware parses URL encoded data and sends it to the req.body. When the extended option is set to true (it should be by default)
// the URL encoded data gets parsed in a neater way. 
app.use(express.urlencoded({ extended: true }));

//Body Parser MiddleWare This middleware parses the json stored in the request body and transforms it to a javascript object which can be 
//accessed through req.body. 
app.use(express.json());

//Use cookie parser
app.use(cookieParser());

//Setting gup session cookie
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

/**
  The middlewares below will trigger in order. Each middleware processes and transforms the request as needed. 
  If we don't use the next() method, the request will stop traveling and never reach an endpoint or other middlewares. 
  In the example below, middleware 4 does not have a next, so if a client asks for an unknown route, the 
  Unknown route handler will never be triggered because the request stoped at middleware 4. 
 

  (start: req obj travels)
    |
  app.use((req, res, next) => {
    console.log('middleware 1');
    throw new Error('oh no!')
    next()
  });
    |
    |
  app.use((req, res, next) => {
    console.log('middleware 2');
    next()
  });
    |
  app.use((req, res, next) => {
    console.log('middleware 3');
    next()
  });
    |
  app.use((req, res, next) => console.log('middleware 4'));
  (stop)
*/


// ************************************************ Mongo Connection ************************************************************************
// Use environmental variables instead of adding the database URI, you don't want to commit exposed credentials
// Using dotenv, we can crate custom environmental variables, also make sure that you include the .env inside
// your .gitignore file. 

// To find URI, login to MongoDB atlas account, go to the security section of the left side bar menu and click
// "Database Access". There, you can find the username and set the password for your database. 
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.DATABASE_NAME,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(`Failed to connect to database: ${err}`));



app.get('/tasks', postgreMiddleware.getTasks, taskController.sendTasks);
app.post('/add', postgreMiddleware.addTask, mongoMiddleware.addTask, taskController.sendTasks);
app.put('/update', postgreMiddleware.updateTask, taskController.sendTasks);
app.delete('/delete', postgreMiddleware.deleteTask, taskController.sendTasks);


// another middleware, we can require middleware from other files.
// app.use(tutorialController.logger);


// ***************************************************** Routes **************************************************************************
// Members API route
// app.use('/api/members', require('./routes/members'))


// I was able to send a cookie using the res.cookie method. Make sure to send a response, looks like cookies are not consired 
// as resonse. 
app.get('/cookie', (req, res) => {
  console.log('here')
  res.cookie("greating", "hello-worlds")
  res.json({greeting: "cookie"})
});


// ************************************************* Error Handling ***********************************************************************
// Unknown route handler, this endpoint should be the last one and it is meant to catch any URI requests that did not match 
// any available endpoints 
app.get('*', (req, res) => res.status(404).send('Page not Found'));


// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  return res.status(errorObj.status).json(errorObj.message);
});


// ************************************************* Start Server *************************************************************************
// This function starts the web server and listens for incoming HTTP requests on a specific port
// Make sure to add this after you have configured your routes, middleware, and other settings to 
// make sure that the web server is properly configures before it starts running
app.listen(PORT, () => {
 console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;