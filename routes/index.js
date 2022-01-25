const indexRouter = require('express').Router()

const UserController = require('../controllers/user')

indexRouter.post('/login')
indexRouter.post('/register')

module.exports = indexRouter