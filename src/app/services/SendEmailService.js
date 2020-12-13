const Exception = require('../exceptions/Exception')
const ErrorCode = require('../exceptions/ErrorCode')
const nodemailer = require('nodemailer');

const sender = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SENDER_EMAIL_USER,
        pass: process.env.SENDER_EMAIL_PASSWORD
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

            await sender.sendMail(mailOptions)
        }
        catch (error) {
            console.log(error)
            throw new Exception(ErrorCode.SEND_EMAIL_FAILED)
        }
    }
}

module.exports = new SendEmailService();