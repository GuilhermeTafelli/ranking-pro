const Exception = require('../exceptions/Exception')
const ErrorCode = require('../exceptions/ErrorCode')
const nodemailer = require('nodemailer');
console.log(process.env.SENDER_EMAIL_USER)
console.log(process.env.SENDER_EMAIL_PASSWORD)

const sender = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'guilhermetafellieducation@gmail.com',
        pass: 'tafelli0104'
    }
});

class SendEmailService {

    async sendEmail(email, subject, htmlTemplate){

        try{
            const mailOptions = {
                from: process.env.SENDER_EMAIL_USER,
                to: email,
                subject: subject,
                html: htmlTemplate
            };

            console.log(sender)

            await sender.sendMail(mailOptions)
        }
        catch (error) {
            console.log(error)
            throw new Exception(ErrorCode.AUTHENTICATION_FAILED)
        }
    }
}

module.exports = new SendEmailService();