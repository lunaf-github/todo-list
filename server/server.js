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

// Database Connections 
const pgDB = require('./config/postgreConnect.js');  // potgres database pool connection
const mongoDB = require('./config/mongoConnect.js');  // mongoDB connection

// ************************************************** Database Models ***********************************************************************
const Task = require('./model/mongoModel.js');  // mongoDB Schema

// **************************************************** Import Controllers and middleware ***************************************************************
// const tutorialController = require('./controllers/tutorialControllers.js');
const taskController = require('./controllers/taskController.js');
const sendJwtToken = require('./controllers/jwtController.js');
const postgreMiddleware = require('./middleware/postgreMiddleware.js');
const mongoMiddleware = require('./middleware/mongoMiddleware.js');
const verifyJWT = require('./middleware/authenticateTokenMiddleware.js');

// **************************************************** Use Middlewares *************************************************************************
// The express.static(path, {options}) middleware serves static files to the client. It will look at req.url to 
// find out what file to send. The file name needs to be specified on the url. For example, http://localhost:3000/login.html
// In this example, the login HTML will be sent to the client if it exists inside the directory. 
// If there is no file name in our url path, the static method will send the index.html if available. If the url requests for 
// a file that does not exist in our directory, it will run the next() function so other middlewares can handle the fallback. 
// This is the reason why I receive the index.html file when I request for localhost:3000/.  I can disable
// this with the options objected, by setting the index property to false or I can set a different file to be sent instead. 
// the requests object does not gets passed to the next middleware if a file is found and sent to the client. 

// It is not good practice to send my entire build folder to the client if we are planning to add authentication because
// the client wil have access to all the files by typing the file they want inside the url, making authentication useless. 
//The static method is great for files and other assets that do not contain sensitive information. 
//app.use(express.static(path.join(__dirname, '../build'))); <-- I removed this because I'm adding authentication

app.use(express.static(path.join(__dirname, '../assets')))
app.use(express.static(path.join(__dirname, '../build')))


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

// another middleware, we can require middleware from other files.
// app.use(tutorialController.logger);
// ***************************************************** API endoints **************************************************************************

// app.get('/', taskController.sendLogin);

app.get('/tasks', verifyJWT, postgreMiddleware.getTasks, taskController.sendTasks);
app.post('/add', postgreMiddleware.addTask, mongoMiddleware.addTask, taskController.sendTasks);
app.put('/update', postgreMiddleware.updateTask, taskController.sendTasks);
app.delete('/delete', postgreMiddleware.deleteTask, taskController.sendTasks);
app.post('/login', sendJwtToken);



// I was able to send a cookie using the res.cookie method. Make sure to send a response, looks like cookies are not consired 
// as resonse. 
app.get('/cookie', (req, res) => {
  console.log('here')
  res.cookie("greating", "hello-worlds")
  res.json({greeting: "cookie"})
});

// ***************************************************** Routes **************************************************************************
// Members API route
// app.use('/api/members', require('./routes/members'))


// ************************************************* Error Handling ***********************************************************************
// Unknown route handler, this endpoint should be the last one and it is meant to catch any URI requests that did not match 
// any available endpoints 
app.get('*', (req, res) => {
  console.log(req.url);
  res.status(404).send('Page not Found')
} 
);


// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
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