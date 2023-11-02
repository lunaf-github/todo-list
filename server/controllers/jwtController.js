const jwt = require('jsonwebtoken');


// send accessToken to user
function sendAccessToken(req, res) {

    // Need authenticate user first
    const username = req.body.username;
    const user = { name: username}

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    return res.json({accessToken: accessToken});
  
}


module.exports = sendAccessToken;