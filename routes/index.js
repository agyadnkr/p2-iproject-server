const indexRouter = require('express').Router()

const UserController = require('../controllers/user')
const LocationController = require('../controllers/location')

indexRouter.post('/login', UserController.login)
indexRouter.post('/register', UserController.register)

indexRouter.post('/locations', LocationController.addLocation)
indexRouter.get('/locations', LocationController.fetchLocations)

module.exports = indexRouter