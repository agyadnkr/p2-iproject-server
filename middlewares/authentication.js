const { signToken } = require('../helpers/jwt')
const { User } = require('../models')

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    const { id } = signToken(access_token);
    const user = await User.findByPk(id);

    if (!user) {
      throw ({ name: 'AuthenticationFailed' })
    }

    req.user = {
      id,
      username: user.username,
      email: user.email 
    };
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = authentication