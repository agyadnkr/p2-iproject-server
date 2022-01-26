const { User, Favourite, Location, Image } = require('../models')
const { Op } = require('sequelize')
const { createToken } = require('../helpers/jwt')
const { comparePassword } = require('../helpers/bcrpyt')

class UserController {
  static async register(req, res, next) {
    try {
      const { username, email, password } = req.body;

      const result = await User.create({ username, email, password })

      res.status(201).json({
        id: result.id,
        username: result.username,
        email: result.email
      })
    } catch (error) {
      next(error)
    }
  }

  static async login(req, res, next) {
    try {
      const { user, password } = req.body;

      const findUser = await User.findOne({
        where: {
          [Op.or]: [{
            username: user
          },
          {
            email: user
          }]
        }
      });

      if (!findUser) {
        throw ({ name: 'UserNotFound' })
      };

      if(!comparePassword(password, findUser.password)) {
        throw ({ name: 'PasswordInvalid' })
      };

      const payload = {
        id: findUser.id,
        username: findUser.username,
        email: findUser.email
      };

      const token = createToken(payload);

      res.status(200).json({
        access_token: token,
        id: findUser.id,
        username: findUser.username,
        email: findUser.email
      });
    } catch (error) {
      next(error)
    }
  }
}

module.exports = UserController