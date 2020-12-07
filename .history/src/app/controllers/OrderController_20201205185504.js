const OrderService = require("../services/OrderService")
const ExceptionHandler = require("../exceptions/ExceptionHandler")
const ErrorCode = require("../exceptions/ErrorCode")
const Exception = require("../exceptions/Exception")

class UserController{

    async create(req, res){
        try {
            const response = await OrderService.create(req.body, req.userId)

            res.status(201)
            return res.json(response)        
        }
        catch(error){
            ExceptionHandler(res, error)
        }
    }

    async listOrderByUserId(req, res){
        try {
            const response = await OrderService.listOrderByUserId(req.userId)

            return res.json(response)        
        }
        catch(error){
            ExceptionHandler(res, error)
        }
    }

    async listAll(req, res){

        try {

            if(!req.roles.includes("ADMIN")) throw new Exception(ErrorCode.PERMISSION_DENIED)

            const response = await OrderService.listAll()

            return res.json(response)        
        }
        catch(error){
            ExceptionHandler(res, error)
        }
    }
}

module.exports = new UserController()