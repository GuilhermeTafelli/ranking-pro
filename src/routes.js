const routes = require('express').Router()
const { authMiddleware, userIdMiddleware } = require('./app/controllers/middlewares/auth')
const SessionController = require('./app/controllers/SessionController')
const UserController = require('./app/controllers/UserController')
const ResetPasswordController = require('./app/controllers/ResetPasswordController')
const SocialMediaController = require('./app/controllers/SocialMediaController')
const OrderController = require('./app/controllers/OrderController')
const GamificationController = require('./app/controllers/GamificationController')
const InstagramProfileSimulationController = require('./app/controllers/InstagramProfileSimulationController')

routes.post('/auth', SessionController.auth)
routes.post('/users', UserController.create)
routes.get('/users/email/:email', UserController.userExistsByEmail)
routes.get('/users/cpf/:cpf', UserController.userExistsByCpf)

routes.post('/users/admin', UserController.createAdmin)

routes.post('/reset-password', ResetPasswordController.resetPassword)
routes.post('/reset-password/token', ResetPasswordController.sendResetPasswordToken)
routes.post('/users/socials-media', SocialMediaController.create)
routes.get('/socials-media/ranking', userIdMiddleware, SocialMediaController.getRanking)
routes.get('/socials-media/ranking/paged', userIdMiddleware, SocialMediaController.getRankingPaged)

routes.get('/socials-media/ranking/score', userIdMiddleware, SocialMediaController.getRankingScore)

routes.get('/users/socials-media/:socialMediaId', SocialMediaController.getById)

routes.use(authMiddleware)

routes.get('/users/social-media', SocialMediaController.getByUserId)
routes.put('/users', UserController.update)
routes.post('/users/orders', OrderController.create)
routes.get('/users/orders', OrderController.listOrderByUserId)

routes.post('/social-medias/instagram/simulations', InstagramProfileSimulationController.create)
routes.get('/social-medias/instagram/simulations', InstagramProfileSimulationController.listInstagramProfileSimulationsByUserId)
routes.get('/social-medias/instagram/simulations/:id', InstagramProfileSimulationController.getInstagramProfileSimulationsByUserIdAndId)

routes.post('/socials-media/gamification/code', GamificationController.validityCode)
routes.get('/socials-media/gamification/code', SocialMediaController.getGamificationCodesByUserId)
routes.put('/socials-media/gamification/code', SocialMediaController.updateCodeScoreInAllUsers)

routes.post('/gamification/code', GamificationController.create)


routes.get('/orders', OrderController.listAll)
routes.post('/orders/:orderId/answer', OrderController.answerOrder)
routes.get('/orders/:orderId', OrderController.getDetailOrderById)

module.exports = routes