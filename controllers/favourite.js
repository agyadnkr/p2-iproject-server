const { User, Location, Image, Favourite } = require('../models')
const { Op } = require('sequelize')

class FavouriteController {
  static async addFavourite(req, res,  next) {
    try {
      const { id } = req.user;
      const { LocationId } = req.params;

      const findFavourite = await Favourite.findOne({
        where: {
          [Op.and]: [{
            UserId: id,
            LocationId
          }]
        }
      })

      if (findFavourite) {
        throw ({ name: 'AlreadyOnFav' })
      }

      const result = await Favourite.create({
        UserId: id,
        LocationId
      })
      res.status(201).json({ message: 'Success add to favourite' })
    } catch (error) {
      next(error)
    }
  }

  static async fetchFavourites(req, res, next) {
    try {
      const { id } = req.user;

      const result = await Favourite.findAll({
        where: {
          UserId: id
        },
        include: [Location]
      })

      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = FavouriteController