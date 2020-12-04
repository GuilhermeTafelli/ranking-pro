const routes = require('express').Router()
const authMiddleware = require('./app/controllers/middlewares/auth')
const SessionController = require('./app/controllers/SessionController')
const UserController = require('./app/controllers/UserController')
const ResetPasswordController = require('./app/controllers/ResetPasswordController')
const SocialMediaController = require('./app/controllers/SocialMediaController')

routes.post('/auth', SessionController.auth);
routes.post('/users', UserController.create);
routes.post('/reset-password', ResetPasswordController.resetPassword)
routes.post('/reset-password/token', ResetPasswordController.sendResetPasswordToken)
routes.post('/users/socials-media', SocialMediaController.create)
routes.get('/socials-media/ranking', SocialMediaController.getRanking)

routes.use(authMiddleware)

routes.put('/users', UserController.update)
routes.get('/users/socials-media/:socialMediaId', SocialMediaController.getById)

module.exports = routes;