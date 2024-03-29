const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {

    const authHeader = req.headers['authorization']
    console.log(authHeader, 'authHeader')
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        console.log('not authorized')
        return res.sendStatus(401);
    } 

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        console.log(user);
        req.user = user;
        next();
    })
}

module.exports = authenticateToken