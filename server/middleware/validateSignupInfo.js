function verifySignupInfoMiddleware(req, res, next) {
  const { username, newPassword } = req.body;
  
  try {
        if (!username || !newPassword || newPassword.length < 8) {
            throw new Error('invalid password or username');
        }
        next();
      } catch(err) {
        next({
          log: `invalid username or password: ${err}`,
          status: 406,
          message: 'Unable to continue signup process'
        });
      }
}

module.exports = verifySignupInfoMiddleware;