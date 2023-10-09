const express = require('express');
const app = express();
const path = require('path');
const tutorialController = require('./controllers/tutorialControllers.js');
const mongoose = require('mongoose');
// cookie parse is used to parse a cookie and makes it accessible to req.cookies. 
const cookieParser = require('cookie-parser')
// This is for creating session cookies. This module doesn't need cookie parse any more, it can parse cookies now. 
const session = require('express-session')
const Task = require('../model/taskModel.js');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

// if the requested URI is the root, the express.static() middleware acts as an endpoint and will send the static files. 
// The request does not get transverse to other middlewares. 

app.use(express.static(path.join(__dirname, '../build'))); 

// This middleware parses URL encoded data and sends it to the req.body. When the extended option is set to true (it should be by default)
// the URL encoded data gets parsed in a neater way. 

app.use(express.urlencoded({ extended: true }));

//Body Parser MiddleWare This middleware parses the json stored in the request body and transforms it to a javascript object which can be accessed through req.body. 
app.use(express.json());

//Use cookie parser
app.use(cookieParse());

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


// Use environmental variables instead of adding the database URI, you don't want to commit exposed credentials
// Using dotenv, we can crate custom environmental variables, also make sure that you include the .env inside
// your .gitignore file. 

// To find URI, login to MongoDB atlas account, go to the security section of the left side bar menu and click
// "Database Access". There, you can find the username and set the password for your database. 

mongoose
  .connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.DATABASE_NAME,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(`Failed to connect to database: ${err}`));



async function entryDoc() {
  const task = new Task({task: "Do the laundry!"});
  await task.save();
}

entryDoc();

// another middleware, we can require middleware from other files.
app.use(tutorialController.logger);

// Members API route
app.use('/api/members', require('./routes/members'))


// I was able to send a cookie using the res.cookie method. Make sure to send a response, looks like cookies are not consired 
// as resonse. 
app.get('/cookie', (req, res) => {
  console.log('here')
  res.cookie("greating", "hello-worlds")
  res.json({greeting: "cookie"})
});

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


app.listen(PORT, () => {
 console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;