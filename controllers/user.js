const { User, Favourite, Location, Image } = require('../models')
const { Op } = require('sequelize')
const { createToken } = require('../helpers/jwt')
const { comparePassword } = require('../helpers/bcrpyt')
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID

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

      if (!comparePassword(password, findUser.password)) {
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

  static async googleLogin(req, res, next) {
    try {
      const { token } = req.body
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: `${GOOGLE_CLIENT_ID}`
      })

      const payload = ticket.getPayload();

      const [user, created] = await User.findOrCreate({
        where: { email: payload.email },
        defaults: {
          password: "12345678",
          username: `google-${payload.email}`
        }
      })

      const accessToken = createToken({ id: user.id })
      res.status(200).json({ access_token: accessToken, id: user.id, email: user.email, role: user.role })

    } catch (error) {
      next(error)
    }
  }
}

module.exports = UserController