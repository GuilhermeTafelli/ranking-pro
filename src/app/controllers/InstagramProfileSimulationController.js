const InstagramProfileSimulationService = require("../services/InstagramProfileSimulationService")
const ExceptionHandler = require("../exceptions/ExceptionHandler")
const ErrorCode = require("../exceptions/ErrorCode")
const Exception = require("../exceptions/Exception")

class InstagramProfileSimulationController{

    async create(req, res){
        try {
            const response = await InstagramProfileSimulationService.create(req.body, req.userId)

            res.status(201)
            return res.json(response)        
        }
        catch(error){
            ExceptionHandler(res, error)
        }
    }

    async listInstagramProfileSimulationsByUserId(req, res){
        try {
            const response = await InstagramProfileSimulationService.listInstagramProfileSimulationsByUserId(req.userId)

            return res.json(response)        
        }
        catch(error){
            ExceptionHandler(res, error)
        }
    }

    async getInstagramProfileSimulationsByUserIdAndId(req, res){
        try {
            const response = await InstagramProfileSimulationService.getInstagramProfileSimulationsByUserId(req.userId, req.params.id)

            return res.json(response)        
        }
        catch(error){
            ExceptionHandler(res, error)
        }
    }
}

module.exports = new InstagramProfileSimulationController()