const { User } = require("../models");
const Exception = require('../exceptions/Exception')
const ErrorCode = require('../exceptions/ErrorCode')
class UserService{

    async create(newUser){

        try {
            const existingUser = await User.findOne({ where: { email: newUser.email } })
        
            if (existingUser) {
                console.log("error")
                throw new Exception(ErrorCode.USER_ALREDY_EXISTS)
            }

            const user = await User.create(
                {
                    name: newUser.name,
                    surname: newUser.surname,
                    email: newUser.email,
                    password: newUser.password,
                    phone: newUser.phone
                }
            )
        
            console.log(user)

            let token = await user.generateToken()
        
            return { userId: user.id, token: token }        
        }
        catch(error){
            console.log(error)
            if(error.code === ErrorCode.USER_ALREDY_EXISTS.code) throw error;
            throw new Exception(ErrorCode.CREATE_USER_FAILED)
        }
    }
}

module.exports = new UserService();