const indexRouter = require('express').Router()

const UserController = require('../controllers/user')

// indexRouter.post('/login', UserController.login)
indexRouter.post('/register', UserController.register)

module.exports = indexRouter