const { User, Favourite, Location, Image } = require('../models')
const { Op } = require('sequelize')

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

  
}

module.exports = UserController