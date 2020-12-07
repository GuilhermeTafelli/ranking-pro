const routes = require('express').Router()
const { authMiddleware, userIdMiddleware } = require('./app/controllers/middlewares/auth')
const SessionController = require('./app/controllers/SessionController')
const UserController = require('./app/controllers/UserController')
const ResetPasswordController = require('./app/controllers/ResetPasswordController')
const SocialMediaController = require('./app/controllers/SocialMediaController')
const OrderController = require('./app/controllers/OrderController')

routes.post('/auth', SessionController.auth)
routes.post('/users', UserController.create)
routes.post('/users/admin', UserController.createAdmin)

routes.post('/reset-password', ResetPasswordController.resetPassword)
routes.post('/reset-password/token', ResetPasswordController.sendResetPasswordToken)
routes.post('/users/socials-media', SocialMediaController.create)
routes.get('/socials-media/ranking', userIdMiddleware, SocialMediaController.getRanking)
routes.get('/users/socials-media/:socialMediaId', SocialMediaController.getById)

routes.use(authMiddleware)

routes.get('/users/social-media', SocialMediaController.getByUserId)
routes.put('/users', UserController.update)
routes.post('/users/orders', OrderController.create)
routes.get('/users/orders', OrderController.listOrderByUserId)

routes.get('/orders', OrderController.listAll)
routes.get('/orders/:orderId', OrderController.getDetailOrderById)
routes.get('/orders/:orderId/answer', OrderController.getDetailOrderById)


module.exports = routes