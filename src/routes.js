const routes = require('express').Router()
const authMiddleware = require('./app/controllers/middlewares/auth')
const SessionController = require('./app/controllers/SessionController')
const UserController = require('./app/controllers/UserController')
const ResetPasswordController = require('./app/controllers/ResetPasswordController')


routes.post('/auth', SessionController.auth);
routes.post('/users', UserController.create);
routes.post('/reset-password', ResetPasswordController.resetPassword)
routes.post('/reset-password/token', ResetPasswordController.sendResetPasswordToken)

routes.use(authMiddleware)

module.exports = routes;