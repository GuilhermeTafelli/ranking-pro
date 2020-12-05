const routes = require('express').Router()
const { authMiddleware, mapToResponseRanking } = require('./app/controllers/middlewares/auth')
const SessionController = require('./app/controllers/SessionController')
const UserController = require('./app/controllers/UserController')
const ResetPasswordController = require('./app/controllers/ResetPasswordController')
const SocialMediaController = require('./app/controllers/SocialMediaController')
const OrderController = require('./app/controllers/OrderController')

routes.post('/auth', SessionController.auth);
routes.post('/users', UserController.create);
routes.post('/reset-password', ResetPasswordController.resetPassword)
routes.post('/reset-password/token', ResetPasswordController.sendResetPasswordToken)
routes.post('/users/socials-media', SocialMediaController.create)
routes.get('/socials-media/ranking', authMiddleware, SocialMediaController.getRanking)
routes.get('/users/socials-media/:socialMediaId', SocialMediaController.getById)

routes.use(authMiddleware)

routes.get('/users/social-media', SocialMediaController.getByUserId)
routes.put('/users', UserController.update)
routes.post('/orders', OrderController.create)
routes.get('/orders', OrderController.listOrderByUserId)

module.exports = routes;