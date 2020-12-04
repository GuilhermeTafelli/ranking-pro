const { User } = require("../models");
const { Order } = require("../models");
const OrderStatusType = require("../models/order/OrderStatusType")
const Exception = require('../exceptions/Exception')
const ErrorCode = require('../exceptions/ErrorCode')
const S3Service = require('../integrations/S3Service')
const crypto = require('crypto')

class OrderService{

    async create(newOrder, userId){

        try {        

            const user = await User.findOne({where: { id: userId }});
    
            if (!user) {
                throw new Exception(ErrorCode.USER_NOT_FOUND)
            }

            var filesLink = []

            if(newOrder.files){
                await Promise.all(newOrder.files.map(async file => { 
                    const randomBytes = crypto.randomBytes(8).toString('hex')
                    const link = await S3Service.uploadFilePublicRead(file.base64, "order-"+userId+"-"+randomBytes)
                    console.log(link)
                    filesLink.push(link)
                    console.log(1)
                }))
            }

            console.log(filesLink)

            const order = await Order.create(
                {
                    userId: userId,
                    orderType: newOrder.type,
                    description: newOrder.description,
                    status: OrderStatusType.OPEN.name,
                    statusMessage: OrderStatusType.OPEN.message,
                    filesLink: filesLink
                }
            )

            return { orderId: order.id }        
        }
        catch(error){
            console.log(error)
            if(error instanceof Exception) throw error;
            throw new Exception(ErrorCode.CREATE_USER_FAILED)
        }
    }
}

module.exports = new OrderService();