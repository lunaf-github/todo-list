const mongoose = require('mongoose');


// ************************************************ Mongo Connection ************************************************************************
// Use environmental variables instead of adding the database URI, you don't want to commit exposed credentials
// Using dotenv, we can crate custom environmental variables, also make sure that you include the .env inside
// your .gitignore file. 

// To find URI, login to MongoDB atlas account, go to the security section of the left side bar menu and click
// "Database Access". There, you can find the username and set the password for your database. 

const mongoConnect = mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.DATABASE_NAME,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(`Failed to connect to database: ${err}`));

module.exports = mongoConnect