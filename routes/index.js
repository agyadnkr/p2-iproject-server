const indexRouter = require('express').Router()
const authentication = require('../middlewares/authentication')
const imageUpload  = require('../middlewares/imageUpload')

const UserController = require('../controllers/user')
const LocationController = require('../controllers/location')
const FavouriteController = require('../controllers/favourite')

indexRouter.post('/image-upload', imageUpload,  LocationController.uploadImage)

indexRouter.post('/login', UserController.login)
indexRouter.post('/login/google', UserController.googleLogin)
indexRouter.post('/register', UserController.register)

indexRouter.get('/locations', LocationController.fetchLocations)
indexRouter.post('/locations', LocationController.addLocation)
indexRouter.get('/locations/:id', LocationController.detail)

indexRouter.use(authentication)

indexRouter.get('/favourite', FavouriteController.fetchFavourites)
indexRouter.post('/favourite/:LocationId', FavouriteController.addFavourite)

module.exports = indexRouter