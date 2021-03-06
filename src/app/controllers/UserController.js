const { User } = require("../models");
const UserService = require("../services/UserService")
const ExceptionHandler = require("../exceptions/ExceptionHandler")

class UserController{


    async userExistsByEmail(req, res){
        try {
            const response = await UserService.userExistsByEmail(req.params.email)

            return res.json(response)        
        }
        catch(error){
            ExceptionHandler(res, error)
        }
    }
    async userExistsByCpf(req, res){
        try {
            const response = await UserService.userExistsByCpf(req.params.cpf)

            return res.json(response)        
        }
        catch(error){
            ExceptionHandler(res, error)
        }
    }

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

    async createAdmin(req, res){
        try {
            const response = await UserService.createAdmin(req.body)

            res.status(201)
            return res.json(response)        
        }
        catch(error){
            ExceptionHandler(res, error)
        }
    }


    async update(req, res){
        try {
            const response = await UserService.update(req.userId, req.body)

            return res.json(response)      
        }
        catch(error){
            ExceptionHandler(res, error)
        }
    }
}

module.exports = new UserController()