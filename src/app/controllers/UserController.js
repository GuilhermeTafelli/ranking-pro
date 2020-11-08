const { User } = require("../models");
const UserService = require("../services/UserService")
const ExceptionHandler = require("../exceptions/ExceptionHandler")

class UserController{

    async create(req, res){
        try {
            const response = await UserService.create(req.body)

            res.status(201)
            return res.json(response)        
        }
        catch(error){
            ExceptionHandler(res, error)
        }
    }
}

module.exports = new UserController()