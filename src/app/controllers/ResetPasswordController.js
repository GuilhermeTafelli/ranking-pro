const ResetPasswordService = require('../services/ResetPasswordService')
const ExceptionHandler = require('../exceptions/ExceptionHandler')
class ResetPasswordController {
    async sendResetPasswordToken(req, res){
        try {
            await ResetPasswordService.sendResetPasswordToken(req.body.email)

            res.status(200)
            return res.end()
        } catch(error) {
            ExceptionHandler(res, error)
        }
    }

    async resetPassword(req, res){
        try {
            await ResetPasswordService.resetPassword(req.body)

            res.status(200)
            return res.end()
        } catch(error) {
            ExceptionHandler(res, error)
        }
    }
}

module.exports = new ResetPasswordController();

