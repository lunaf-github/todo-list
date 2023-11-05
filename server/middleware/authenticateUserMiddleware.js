const User = require('../model/mongoModel');
const bcrypt = require('bcrypt');

async function authenticateUserMiddleware(req, res, next) {
    const { password, username } = req.body
    
    try {
        const user = await User.find({username});

        bcrypt.compare(password, user[0].password, function(err, result) {
            if (err) throw new Error(err);

            if (result) {
                next();
            } else {
                return res.status(403).json({authentication: false});
               
            }
        })
    } catch(err) {
        next({
            log: `Unable to authenticate: ${err}`,
            status: 403,
            message: 'Failed to authenticate'
        })
    }
}

module.exports = authenticateUserMiddleware