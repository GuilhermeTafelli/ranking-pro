const { User } = require("../models");
const OrderType = require("../models/order/OrderType");
const Exception = require('../exceptions/Exception')
const ErrorCode = require('../exceptions/ErrorCode')
const S3Service = require('../integrations/S3Service')
const crypto = require('crypto')
const mapToResponse = require('./mappers/UserServiceMapper');

class UserService{

    async create(newOrder){

        try {        

            const user = await User.findOne({where: { id: newOrder.userId }});
    
            if (!user) {
                throw new Exception(ErrorCode.USER_NOT_FOUND)
            }

            var filesLink = []

            if(newOrder){
                user.files.map(file => { 
                    const randomBytes = crypto.randomBytes(8).toString('hex')
                    filesLink.push(await S3Service.uploadFilePublicRead(newUser.profilePhoto.base64, "order-"+newOrder.userId+"-"+randomBytes))
                })
            }


            console.log(filesLink)

            const order = await Order.create(
                {
                    userId: newOrder.userId,
                    description: newOrder.description,
                    status: OrderType.OPEN.name,
                    statusMessage: OrderType.OPEN.message,
                    filesLink: filesLink
                }
            )

            console.log(order)
        
            return { orderId: order.id }        
        }
        catch(error){
            console.log(error)
            if(error instanceof Exception) throw error;
            throw new Exception(ErrorCode.CREATE_USER_FAILED)
        }
    }

    async update(userId, updateUser){
        try {
            console.log(userId, updateUser)
            const user = await User.findOne({ where: { id: userId } })
        
            if (!user) {
                throw new Exception(ErrorCode.USER_NOT_FOUND)
            }

            if(updateUser.profilePhoto.base64){
                const randomBytes  = crypto.randomBytes(8).toString('hex')
                var profilePhotoLink = await S3Service.uploadFilePublicRead(updateUser.profilePhoto.base64, "profile-photo-"+user.name+"-"+randomBytes)
                user.profilePhotoLink = profilePhotoLink
            }
            
            if(updateUser.address) user.address = updateUser.address
            if(updateUser.addressNumber) user.addressNumber = updateUser.addressNumber
            if(updateUser.addressComplement) user.addressComplement = updateUser.addressComplement
            if(updateUser.city) user.city = updateUser.city
            if(updateUser.state) user.state = updateUser.state
            if(updateUser.country) user.country = updateUser.country
            if(updateUser.postalCode) user.postalCode = updateUser.postalCode
            if(updateUser.phone) user.phone = updateUser.phone
            if(updateUser.whatsApp) user.whatsApp = updateUser.whatsApp
            if(updateUser.birthDate) user.birthDate = updateUser.birthDate
            if(updateUser.sex) user.sex = updateUser.sex

            await user.save()
            console.log("enter")
        
            return mapToResponse(user)
        }
        catch(error){
            console.log(error)
            if(error.code === ErrorCode.USER_NOT_FOUND.code) throw error;
            throw new Exception(ErrorCode.UPDATE_USER_FAILED)
        }
    }
    
}

module.exports = new UserService();