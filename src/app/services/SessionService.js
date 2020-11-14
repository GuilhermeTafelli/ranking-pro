const { User } = require("../models");
const Exception = require('../exceptions/Exception')
const ErrorCode = require('../exceptions/ErrorCode')
const mapResponse = require('./mappers/UserServiceMapper')
class SessionService{

    async auth(auth){
        try {
            const { email, password } = auth;
    
            const user = await User.findOne({where: { email }});
    
            if (!user) {
                throw new Exception(ErrorCode.USER_ALREDY_EXISTS)
            }
    
            console.log(user)
    
            if (!(await user.checkPassword(password))) {
                console.log("in")
                throw new Exception(ErrorCode.INVALID_AUTHENTICATION)
            }
    
            console.log(user.id)
            return {
                user: mapResponse(user),
                token: user.generateToken()
            };
    
        } catch (error) {
            console.log(error)
            if(error.code === ErrorCode.INVALID_AUTHENTICATION.code || error.code === ErrorCode.USER_NOT_FOUND.code) throw error
            else throw new Exception(ErrorCode.AUTHENTICATION_FAILED)
        }
    }
}

module.exports = new SessionService();