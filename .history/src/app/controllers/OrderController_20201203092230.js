const OrderService = require("../services/OrderService")
const ExceptionHandler = require("../exceptions/ExceptionHandler")

class UserController{

    async create(req, res){
        try {
            const response = await OrderService.create(req.body)

            res.status(201)
            return res.json(response)        
        }
        catch(error){
            ExceptionHandler(res, error)
        }
    }
}

module.exports = new UserController()