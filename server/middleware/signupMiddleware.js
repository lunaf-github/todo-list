const bcrypt = require('bcrypt');
const User = require('../model/mongoModel');
const saltRounds = Number(process.env.SALT_ROUNDS);

async function signupMiddleware(req, res, next) {

    const { newPassword, username } = req.body
    try {
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if (err) throw new Error(err);
            bcrypt.hash(newPassword, salt, function(err, hash) {
                if (err) throw new Error(err);
                const newUser = new User({username, password: hash});
                newUser.save();
            })
        })
        next()
    } catch(err) {
        next({
            log: `Unable to generate hash or store data into db: ${err}`,
            status: 406,
            message: 'Failed to create account'
        })
    }
}

module.exports = signupMiddleware;