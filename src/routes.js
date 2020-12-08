const routes = require('express').Router()
const UserController = require('./app/controllers/UserController')

routes.get('/users/category/:category', UserController.getUsersByCategory)
routes.get('/users/:id', UserController.getUsersById)

module.exports = routes