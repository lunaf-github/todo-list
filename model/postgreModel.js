// The pool is used to keep a limited amount of connections open. That way, we don't have
// make handshake connections for every request sent to our Database. 
// I can set more options, but I haven't included any yet. 

const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.PG_URI
});

// I'm not sure if this is standard practice, but I needed this IIFE to test my PG DB connectoin upon
// starting my server. 
(async function testPGConnection() {
    // Creates a client which starts the DB connection (an object that allows me to query to database)
    const client  = await pool.connect();
    // Destroy the client, I don't want the client to use up a spot in my pool
    client.release(true);
})();

// The pool is an event emmiter, so we can create an event listener for the 'connect' event. 
// This is used to let the developer know that our pg database has succesfully connected. 
pool.on('connect', () => console.log('Connected to Postgres'));

// This will catch any errors with our database connection. It is important to include this because
// if  pool emits an error event and no listeners are added , node will emit an uncaught error and
// potentially crash your node process
pool.on('error', (error, client) => {
    console.log(`Server down:  ${error}`);
})

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback);
    }
}