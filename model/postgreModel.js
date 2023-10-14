// The pool is used to keep a limited amount of connections open. That way, we don't have
// make handshake connections for every request sent to our Database. 
// I can set more options, but I haven't included any yet. 

const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.PG_URI
});

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback);
    }
}