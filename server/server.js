const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const PORT = 3000;
app.use(express.static(path.join(__dirname, '../build')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

console.log('hello server')
const MONGO_URI = "mongodb+srv://fluna:nle2dwiM49GpjrN0@cluster0.zhcdp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  // 'mongodb+srv://movie:fads@cluster0.h4vty.mongodb.net/movieFadsDB';
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'Users',
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));


app.get('/styles.css', (req, res) => {
 return res.status(200).sendFile(path.join(__dirname, '../styles.css'));
});


app.get('/', (req,res) =>{
 return res.status(200).render('../client/index.js')
})




// Unknown route handler
app.get('*', (req, res) => res.status(404).send('Page not Found'));

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


app.listen(PORT, () => {
 console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;