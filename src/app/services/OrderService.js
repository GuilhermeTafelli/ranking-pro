const { User } = require("../models");
const { SocialMedia } = require("../models");
const { Order } = require("../models");
const OrderStatusType = require("../domains/order/OrderStatusType")
const OrderType = require("../domains/order/OrderType")
const Exception = require('../exceptions/Exception')
const ErrorCode = require('../exceptions/ErrorCode')
const S3Service = require('../integrations/S3Service')
const crypto = require('crypto')
const { mapListToResponse, mapCompleteListToResponse, mapCompleteToResponse } = require("./mappers/OrderServiceMapper");
const SocialMediaService = require("./SocialMediaService");
const Medals = require("../domains/medals/Medals");


class OrderService {

    async create(newOrder, userId) {

        try {

            const user = await User.findOne({ where: { id: userId } });

            if (!user) {
                throw new Exception(ErrorCode.USER_NOT_FOUND)
            }

            var filesLink = []

            if (newOrder.files) {
                await Promise.all(newOrder.files.map(async file => {
                    const randomBytes = crypto.randomBytes(8).toString('hex')
                    const link = await S3Service.uploadFilePublicRead(file, "order-" + userId + "-" + randomBytes)
                    console.log(link)
                    filesLink.push(link)
                    console.log(1)
                }))
            }

            console.log(newOrder.customFields)

            const order = await Order.create(
                {
                    userId: userId,
                    type: newOrder.type,
                    description: newOrder.description,
                    status: OrderStatusType.OPEN.name,
                    statusMessage: OrderStatusType.OPEN.message,
                    filesLink: filesLink,
                    customFields: newOrder.customFields
                }
            )

            return { orderId: order.id }
        }
        catch (error) {
            console.log(error)
            if (error instanceof Exception) throw error;
            throw new Exception(ErrorCode.CREATE_USER_FAILED)
        }
    }

    async listOrderByUserId(userId) {

        try {
            const orders = await Order.findAll({ where: { userId: userId } });
            return mapListToResponse(orders)
        }
        catch (error) {
            console.log(error)
            if (error instanceof Exception) throw error;
            throw new Exception(ErrorCode.CREATE_USER_FAILED)
        }
    }

    async listAll() {

        try {
            const orders = await Order.findAll({ include: { model: User } })
            return mapCompleteListToResponse(orders)
        }
        catch (error) {
            console.log(error)
            if (error instanceof Exception) throw error;
            throw new Exception(ErrorCode.CREATE_USER_FAILED)
        }
    }

    async answerOrder(orderId, orderAnswer) {
        console.log(orderId)
        const order = await Order.findOne({ where: { id: orderId }, include: { model: User } })

        order.statusMessage =
            order.status = orderAnswer.status

        console.log(orderAnswer.status, OrderStatusType.DONE)
        if (orderAnswer.status == OrderStatusType.DONE.name) {
            const socialMedia = await SocialMediaService.getByUserId(order.userId)

            var medals = new Set(socialMedia.medals)
            console.log(socialMedia.medals)
            console.log(medals)

        
            if (order.type == OrderType.MEDAL_FIRST_VIDEO_FEEDBACK) {
                medals.add(OrderType.MEDAL_FIRST_VIDEO_FEEDBACK)
            }

            if(order.type == OrderType.REGISTRY_NEW_CUSTOMER){
                socialMedia.customers = socialMedia.customers ? socialMedia.customers+1 : 1
                medals.add(OrderType.MEDAL_FIRST_CUSTOMER_TEST)
            }

            console.log(order.type)

            if(order.type == OrderType.REGISTRY_NEW_CUSTOMER_TEST){
                console.log("teste")
                socialMedia.testCustomers = socialMedia.testCustomers ? socialMedia.testCustomers+1 : 1
            }

            if(order.type == OrderType.UPDATE_MONTHLY_INVOICING){

                if(order.customFields.monthlyInvoicing >= 30000){
                    medals.add(Medals.MEDAL_FIRST_CUSTOMER_TEST)
                    medals.add(Medals.MEDAL_FIRST_CONTRACT)
                    medals.add(Medals.MEDAL_3_REVENUES)
                    medals.add(Medals.MEDAL_5_REVENUES)
                    medals.add(Medals.MEDAL_10_REVENUES)
                    medals.add(Medals.MEDAL_20_REVENUES)
                    medals.add(Medals.MEDAL_30_REVENUES)
                }
                else  if(order.customFields.monthlyInvoicing >= 20000){
                    medals.add(Medals.MEDAL_FIRST_CUSTOMER_TEST)
                    medals.add(Medals.MEDAL_FIRST_CONTRACT)
                    medals.add(Medals.MEDAL_3_REVENUES)
                    medals.add(Medals.MEDAL_5_REVENUES)
                    medals.add(Medals.MEDAL_10_REVENUES)
                    medals.add(Medals.MEDAL_20_REVENUES)
                }
                else  if(order.customFields.monthlyInvoicing >= 10000){
                    medals.add(Medals.MEDAL_FIRST_CUSTOMER_TEST)
                    medals.add(Medals.MEDAL_FIRST_CONTRACT)
                    medals.add(Medals.MEDAL_3_REVENUES)
                    medals.add(Medals.MEDAL_5_REVENUES)
                    medals.add(Medals.MEDAL_10_REVENUES)
                }
                else  if(order.customFields.monthlyInvoicing >= 5000){
                    medals.add(Medals.MEDAL_FIRST_CUSTOMER_TEST)
                    medals.add(Medals.MEDAL_FIRST_CONTRACT)
                    medals.add(Medals.MEDAL_3_REVENUES)
                    medals.add(Medals.MEDAL_5_REVENUES)
                }
                else  if(order.customFields.monthlyInvoicing >= 3000){
                    medals.add(Medals.MEDAL_FIRST_CUSTOMER_TEST)
                    medals.add(Medals.MEDAL_FIRST_CONTRACT)
                    medals.add(Medals.MEDAL_3_REVENUES)
                }

                socialMedia.monthlyInvoicing = order.customFields.monthlyInvoicing
            }

            await SocialMedia.update(
                {
                    medals: Array.from(medals),
                    customers: socialMedia.customers,
                    testCustomers: socialMedia.testCustomers
                },
                {
                    where: {
                        userId: order.userId
                    }
                }
            )
        }

        await Order.update(
            {
                statusMessage: orderAnswer.statusMessage,
                status: orderAnswer.status
            },
            {
                where: {
                    id: orderId
                }
            }
        )


    }

    async getDetailOrderById(orderId) {

        try {
            const order = await Order.findOne({ where: { id: orderId }, include: { model: User } })
            return mapCompleteToResponse(order)
        }
        catch (error) {
            console.log(error)
            if (error instanceof Exception) throw error;
            throw new Exception(ErrorCode.CREATE_USER_FAILED)
        }
    }
}

module.exports = new OrderService();