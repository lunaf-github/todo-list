const express = require('express');
const app = express();
const path = require('path');
const tutorialController = require('./controllers/tutorialControllers.js');
const mongoose = require('mongoose');


const PORT = process.env.PORT || 3000;



// if the requested URI is the root, the express.static() middleware acts as an endpoint and will send the static files. 
// The request does not get transverse to other middlewares. 

app.use(express.static(path.join(__dirname, '../build'))); 

// This middleware parses URL encoded data and sends it to the req.body. When the extended option is set to true (it should be by default)
// the URL encoded data gets parsed in a neater way. 

app.use(express.urlencoded({ extended: true }));

//Body Parser MiddleWare: This middleware parses the json stored in the request body and transforms it to a javascript object which can be accessed through req.body. 
app.use(express.json());

/**
  The middlewares below will trigger in order. Each middleware processes and transforms the request as needed. 
  If we don't use the next() method, the request will stop traveling and never reach an endpoint or other middlewares. 
  In the example below, middleware 4 does not have a next, so if a client asks for an unknown route, the 
  Unknown route handler will never be triggered because the request stoped at middleware 4. 
 
  app.use((req, res, next) => {
    console.log('middleware 1');
    throw new Error('oh no!')
    next()
  });


  app.use((req, res, next) => {
    console.log('middleware 2');
    next()
  });

  app.use((req, res, next) => {
    console.log('middleware 3');
    next()
  });

  app.use((req, res, next) => console.log('middleware 4'));
*/



// const MONGO_URI = "mongodb+srv://fluna:nle2dwiM49GpjrN0@cluster0.zhcdp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

// mongoose
//   .connect(MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     dbName: 'Users',
//   })
//   .then(() => console.log('Connected to MongoDB'))
//   .catch((err) => console.log(`Failed to connect to database: ${err}`));

// another middleware, we can require middleware from other files.
app.use(tutorialController.logger);

// Members API route
app.use('/api/members', require('./routes/members'))

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