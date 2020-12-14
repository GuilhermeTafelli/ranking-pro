const { randomBytes } = require('crypto');
const crypto = require('crypto')
const { User } = require("../models");
const Exception = require('../exceptions/Exception')
const ErrorCode = require('../exceptions/ErrorCode')
const SendEmail = require('../services/SendEmailService');
const SendEmailService = require("../services/SendEmailService");
const fs = require('fs');
const UserService = require('./UserService');

class ResetPasswordService {

    constructor() {
        fs.readFile('./src/static/reset-password-email-template.html', (err, data) => {
            this.resetPasswordHTMLEmailTemplate = String(data)
        })
    }

    async sendResetPasswordToken(email) {

        try {
            const user = await User.findOne({ where: { email: email } })

            if (!user) {
                throw new Exception(ErrorCode.USER_NOT_FOUND)
            }

            const token = crypto.randomBytes(20).toString('hex')
            const expiresIn = new Date()
            expiresIn.setMinutes(expiresIn.getMinutes() + process.env.FORGOT_PASSWORD_TOKEN_EXPIRES)
            console.log(expiresIn)

            user.passwordResetToken = token
            user.passwordResetExpiresIn = expiresIn
            await user.save();

            var resetPasswordHTMLEmailTemplateWithLink = this.resetPasswordHTMLEmailTemplate.replace(/{reset-password-link}/g, process.env.FORGOT_PASSWORD_WEB_URL + "/email/" + email + "/token/" + token)
            await SendEmailService.sendEmail(email, "Redefinição de senha", resetPasswordHTMLEmailTemplateWithLink)

            return
        }
        catch (error) {
            console.log(error)
            if (error.code === ErrorCode.USER_NOT_FOUND.code) throw error
            else throw new Exception(ErrorCode.FAILED_SEND_RESET_PASSWORD_TOKEN)
        }
    }

    async resetPassword(resetPassword) {
        try {
            const user = await User.findOne({ where: { email: resetPassword.email } })
            console.log(user.passwordResetToken, resetPassword.token)
            console.log(user.passwordResetExpiresIn, Date.now())

            if (!user) {
                throw new Exception(ErrorCode.USER_NOT_FOUND)
            }

            if (user.passwordResetToken == null || user.passwordResetToken !== resetPassword.token)
                throw new Exception(ErrorCode.INVALID_TOKEN)


            if (user.passwordResetExpiresIn == null || user.passwordResetExpiresIn < Date.now())
                throw new Exception(ErrorCode.TOKEN_EXPIRED)

            else {
                user.password = resetPassword.newPassword,
                    user.passwordResetToken = null,
                    user.passwordResetExpiresIn = null

                await user.save()
            }

            return
        }
        catch (error) {
            console.log(error)
            if (error.code === ErrorCode.INVALID_TOKEN.code
                || error.code === ErrorCode.USER_NOT_FOUND.code
                || error.code === ErrorCode.TOKEN_EXPIRED.code
            ) throw error

            else throw new Exception(ErrorCode.FAILED_RESET_PASSWORD)
        }
    }
}

module.exports = new ResetPasswordService()