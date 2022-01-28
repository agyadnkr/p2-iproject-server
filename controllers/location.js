const { User, Location, Image, Favourite } = require('../models')
const { Op } = require('sequelize')

class LocationController {
  static async addLocation(req, res, next) {
    try {
      const { name, address, lattitude, longitude, mapsUrl, price } = req.body;

      const result = await Location.create({
        name,
        address,
        lattitude,
        longitude,
        mapsUrl,
        price
      })
      res.status(201).json({ message: 'Success add location' })
    } catch (error) {
      next(error)
    }
  }

  static async fetchLocations (req, res, next) {
    try {
      const result = await Location.findAll();

      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async detail(req, res, next) {
    try {
      const { id } = req.params
      console.log(id)
      const result = await Location.findByPk(id, {
        include: [Image]
      })
      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = LocationController
