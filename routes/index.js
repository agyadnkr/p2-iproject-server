const indexRouter = require('express').Router()

const UserController = require('../controllers/user')
const LocationController = require('../controllers/location')

indexRouter.post('/login', UserController.login)
indexRouter.post('/register', UserController.register)

indexRouter.get('/locations', LocationController.fetchLocations)

indexRouter.get('/locations/:id', LocationController.detail)

indexRouter.post('/locations', LocationController.addLocation)
module.exports = indexRouter