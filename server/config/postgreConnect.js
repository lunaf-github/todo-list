const { Pool } = require('pg');

/**
 * What is a pool?
 * The pool is used to keep a limited amount of connections open. That way, we don't have
 * make handshake connections for every request sent to our Database. It is also used
 * to prevent overloading the database with queries. 
 * More Info: https://www.mongodb.com/docs/manual/administration/connection-pool-overview/
 */

/**
 * Creating a pool
 *   To create a pool, we need to instantiate it from a Pool class that was deconstruted by the 'pg' module. 
 *   The Pool constructor accepts an object containing configuration properties
 * 
 * Pool Configurations:
 *   We can set the pool size
 *   To see more available options, see https://node-postgres.com/features/connecting
 */

const pool = new Pool({
    connectionString: process.env.PG_URI
});

// *******************************************   connection testing  *****************************************************
// I'm not sure if this is standard practice, but I needed this IIFE to test my PG DB connectoin upon starting my server. 
(async function testPGConnection() {
    // Creates a client which starts the DB connection (an object that allows me to query to database)
    const client  = await pool.connect();
    // Destroy the client, I don't want the client to use up a spot in my pool
    client.release(true);
})();


// *******************************************   Logging  *****************************************************
// The pool is an event emmiter, so we can create an event listener for the 'connect' event. 
// This is used to let the developer know that our pg database has succesfully connected. 
pool.on('connect', () => console.log('Connected to Postgres'));

// This will catch any errors with our database connection. It is important to include this because
// if  pool emits an error event and no listeners are added , node will emit an uncaught error and
// potentially crash your node process
pool.on('error', (error, client) => {
    console.log(`Server down:  ${error}`);
})

// ***************************************   Module Export  *****************************************************
/**
 * We want to abstract away from using our pool object. That way users can only perform quiries instead of other
 * task that can affect our application
 */

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback);
    }
}