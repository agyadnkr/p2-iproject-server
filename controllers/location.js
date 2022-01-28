const { User, Location, Image, Favourite } = require('../models')
const { Op } = require('sequelize')
const fs = require('fs')
const ImageKit = require('imagekit')
let idLocation = ''

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

      idLocation = result.id
      res.status(201).json({ message: 'Success add location' })
    } catch (error) {
      next(error)
    }
  }

  static async fetchLocations(req, res, next) {
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

  static async uploadImage(req, res, next) {
    try {
      // console.log(req.file)
    // SDK initialization
    let imageUrl22

    let imagekit = new ImageKit({
      publicKey: "public_BACW09RMefisOpJUrHcxl/9Id9g=",
      privateKey: "private_m8l+5XTYExKEbUee/bgFrxEd59E=",
      urlEndpoint: "https://ik.imagekit.io/iqpgx3omg7kg"
    });

    fs.readFile('./images/1.jpg', function (err, data) {
      if (err) throw err; // Fail if the file can't be read.
      imagekit.upload({
        file: data, //required
        fileName: `${new Date()}.jpg`, //required
      }, function (error, result) {
        if (error) console.log(error);
        else {
          console.log(result.url)
          imageUrl22 = result.url
          const imageResult = Image.create({
            imageUrl: imageUrl22,
            LocationId: idLocation
          })
      
          res.status(200).json({ message: 'success add image' })
        };
      });
    });

    } catch (error) {
      next(error)
    }
  }
}

module.exports = LocationController
