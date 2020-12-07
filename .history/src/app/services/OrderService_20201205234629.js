const { User } = require("../models");
const { Order } = require("../models");
const OrderStatusType = require("../models/order/OrderStatusType")
const OrderType = require("../models/order/OrderType")
const Exception = require('../exceptions/Exception')
const ErrorCode = require('../exceptions/ErrorCode')
const S3Service = require('../integrations/S3Service')
const crypto = require('crypto')
const { mapListToResponse, mapCompleteListToResponse, mapCompleteToResponse} = require("./mappers/OrderServiceMapper");
const SocialMediaService = require("./SocialMediaService");


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
                    const link = await S3Service.uploadFilePublicRead(file, "order-"+userId+"-"+randomBytes)
                    console.log(link)
                    filesLink.push(link)
                    console.log(1)
                }))
            }

            console.log(filesLink)

            const order = await Order.create(
                {
                    userId: userId,
                    type: newOrder.type,
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

    async listOrderByUserId(userId){

        try {        
            const orders = await Order.findAll({where: { userId: userId }});
            return mapListToResponse(orders)
        }
        catch(error){
            console.log(error)
            if(error instanceof Exception) throw error;
            throw new Exception(ErrorCode.CREATE_USER_FAILED)
        }
    }

    async listAll(){

        try {        
            const orders = await Order.findAll({include: {model:User}})
            return mapCompleteListToResponse(orders)
        }
        catch(error){
            console.log(error)
            if(error instanceof Exception) throw error;
            throw new Exception(ErrorCode.CREATE_USER_FAILED)
        }
    }

    async answerOrder(orderId, orderAnswer){
        console.log(orderId)
        const order = await Order.findOne({where: {id: orderId}, include: {model:User}})

        order.statusMessage = orderAnswer.statusMessage
        order.status = orderAnswer.status

        if(orderAnswer.status == OrderStatusType.DONE){
            
            const socialMedia = SocialMediaService.getByUserId(order.userId)

            var medals = new Set()
            medals = socialMedia.medals
            switch (order.type) {
                case OrderType.MEDAL_3_REVENUES: {
                    medals.add(OrderType.MEDAL_3_REVENUES)
                }
                case OrderType.MEDAL_5_REVENUES: {
                    medals.add(OrderType.MEDAL_3_REVENUES)
                    medals.add(OrderType.MEDAL_5_REVENUES)
                }
                case OrderType.MEDAL_10_REVENUES: {
                    medals.add(OrderType.MEDAL_3_REVENUES)
                    medals.add(OrderType.MEDAL_5_REVENUES)
                    medals.add(OrderType.MEDAL_10_REVENUES)
                }
                case OrderType.MEDAL_20_REVENUES: {
                    medals.add(OrderType.MEDAL_3_REVENUES)
                    medals.add(OrderType.MEDAL_5_REVENUES)
                    medals.add(OrderType.MEDAL_10_REVENUES)
                    medals.add(OrderType.MEDAL_20_REVENUES)
                }
                case OrderType.MEDAL_30_REVENUES: {
                    medals.add(OrderType.MEDAL_3_REVENUES)
                    medals.add(OrderType.MEDAL_5_REVENUES)
                    medals.add(OrderType.MEDAL_10_REVENUES)
                    medals.add(OrderType.MEDAL_20_REVENUES)
                    medals.add(OrderType.MEDAL_30_REVENUES)
                }
            }
            socialMedia.medals = medals
            socialMedia.save()
            order.save()
        }

    }

    async getDetailOrderById(orderId){

        try {        
            const order = await Order.findOne({where: {id: orderId}, include: {model:User}})
            return mapCompleteToResponse(order)
        }
        catch(error){
            console.log(error)
            if(error instanceof Exception) throw error;
            throw new Exception(ErrorCode.CREATE_USER_FAILED)
        }
    }
}

module.exports = new OrderService();